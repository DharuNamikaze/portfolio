---
title: "Stop Adding Services. Use Postgres."
description: "A practical guide showing how Postgres can replace Redis, Elasticsearch, Pinecone, LangChain, and more for growth-stage SaaS."
pubDate: "02-05-2026"
tags: ["Postgres", "Databases", "Architecture", "Infrastructure"]
---

![Kill Streak](/diagrams/Postgres.png)

<br />

You're running Redis, Elasticsearch, Pinecone, MongoDB, InfluxDB, and Kafka in production. What if I told you Postgres can replace all of them — and know exactly at what scale each one breaks down so you know when to actually migrate?

---

## Contents

1. [The mini-AWS problem](#the-mini-aws-problem)
2. [Kill #1 — Redis](#kill-1--redis)
3. [Kill #2 — Elasticsearch](#kill-2--elasticsearch)
4. [Kill #3 — Pinecone](#kill-3--pinecone)
5. [Kill #4 — MongoDB](#kill-4--mongodb)
6. [Kill #5 — InfluxDB](#kill-5--influxdb--time-series-with-timescaledb)
7. [Kill #6 — Kafka CDC](#kill-6--kafka--change-data-capture)
8. [The threshold guide](#the-threshold-guide)
9. [When NOT to use this approach](#when-not-to-use-this-approach)
10. [The verdict](#the-verdict)

---

## Mini-AWS Issue (too many mini-AWS in startups)

Almost every startup will eventually create this "mini-AWS" in their own infrastructure. It usually starts when you need a way to cache data, go for a Redis instance; add an Elasticsearch instance to do search; if you have an AI feature that requires vector embeddings, you might use something like Pinecone.

The point is at some point, you will end up with multiple systems to perform similar tasks, each with its own SDKs, failure scenarios, billing, and learning curves for new teammates before they can deploy anything. All because you reached for one of these products before you actually hit the limits of your main database.

For many years now, PostgreSQL has been working behind the scenes building solutions that would work to fulfil each requirement above, and yet the majority of the "Use PostgreSQL for everything" blog posts simply tell you that you're able to and don't discuss the limits of when you should start to switch.

This post is written to address that exact situation and will contain strong examples of thresholds you should monitor and the signals that indicate you should migrate to a dedicated service.

**Target Audience:** The intended audience for this guidance is growth-phase SaaS (usually up to 0 to 500k MAU), due to the high cost of having a lot of contrasting infrastructure. At large scales, dedicated systems win. However, very few startups will reach that size anytime soon, and the cost associated with the overhead of maintaining an inconsistent infrastructure is importnt.

---

## Kill #1 — Redis

Redis stays for three things: key-value caching, job queues, and pub/sub messaging. Postgres has solid though not identical — answers for all three, each has its own threshold.

### 1. Key-value caching — unlogged tables

Unlogged tables skip the write-ahead log entirely. They're not crash-safe on restart but dramatically faster for ephemeral data. Pair with a `ttl` column and a `pg_cron` cleanup job and you have Redis-style caching without leaving your DB.

```sql
CREATE UNLOGGED TABLE cache (
  key   TEXT        PRIMARY KEY,
  value JSONB       NOT NULL,
  ttl   TIMESTAMPTZ NOT NULL DEFAULT now() + '1 hour'
);

-- Upsert a cache entry
INSERT INTO cache (key, value)
VALUES ('user:42:profile', '{"name":"Dharu"}'::jsonb)
ON CONFLICT (key) DO UPDATE SET
  value = EXCLUDED.value,
  ttl   = now() + '1 hour';

-- Fetch (returns nothing if expired)
SELECT value FROM cache
WHERE key = 'user:42:profile' AND ttl > now();

-- pg_cron: evict stale entries every 5 minutes
DELETE FROM cache WHERE ttl < now();
```

> **Threshold — it's the latency, not throughput.** Unlogged tables can handle the volume but not in-memory latency. Postgres RTT is 1–5ms. Redis is sub-millisecond. For high-frequency reads — social feeds, hot session paths — you'll feel this. The signal to watch is **your p99 cache read latency crossing 5ms**, not request rate. Keep Redis only when you need <1ms reads at >15,000 ops/sec.

### 2. Job queues — SKIP LOCKED

`SELECT FOR UPDATE SKIP LOCKED` lets multiple workers pull jobs concurrently without contention. This is how Que, GoodJob, and Oban work under the hood — it's a production-proven pattern used at real scale.

```sql
CREATE TABLE job_queue (
  id         BIGSERIAL PRIMARY KEY,
  queue_name TEXT        NOT NULL DEFAULT 'default',
  payload    JSONB       NOT NULL,
  status     TEXT        NOT NULL DEFAULT 'pending',
  run_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Worker claims exactly one job atomically
WITH next_job AS (
  SELECT id FROM job_queue
  WHERE  status = 'pending' AND run_at <= now()
  ORDER BY run_at
  LIMIT  1
  FOR UPDATE SKIP LOCKED
)
UPDATE job_queue SET status = 'processing'
WHERE  id = (SELECT id FROM next_job)
RETURNING *;
```

> **Threshold — ~500 jobs/sec.** Works well up to ~500 jobs/sec. Beyond ~2,000 jobs/sec, row lock churn becomes measurable — watch `pg_stat_activity` for worker contention. For email sending, webhook delivery, and async background tasks at SaaS scale: this is more than enough.

### 3. Pub/sub — LISTEN / NOTIFY

`NOTIFY` sends a lightweight signal on an existing connection. `LISTEN` subscribes to it. perfect for cache invalidation — not fit for anything requiring delivery guarantees.

```sql
-- Trigger fires on product change, notifies listeners
CREATE OR REPLACE FUNCTION notify_product_change()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM pg_notify('product_updates', row_to_json(NEW)::text);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- In your app:
-- await client.query('LISTEN product_updates');
-- client.on('notification', msg => cache.invalidate(msg.payload));
```

> **Threshold — no persistence.** If your consumer is down, the NOTIFY is gone. No replay, no delivery guarantee. Use it only for stateless signals like cache busting or UI refresh notifications. For anything requiring guaranteed delivery, use the job queue table above or a proper message broker.

---

## Kill #2 — Elasticsearch

Elasticsearch is a beast to operate. Postgres's full-text search won't beat it at petabyte log ingestion, but for product search, blog search, and content discovery it's more than sufficient — and it stays transactionally consistent with your main data.

### tsvector + tsquery + GIN index

```sql
-- Generated search column — updates automatically on row change
ALTER TABLE products
ADD COLUMN search_vector TSVECTOR
GENERATED ALWAYS AS (
  setweight(to_tsvector('english', coalesce(name, '')), 'A') ||
  setweight(to_tsvector('english', coalesce(description, '')), 'B') ||
  setweight(to_tsvector('english', coalesce(brand, '')), 'C')
) STORED;

CREATE INDEX idx_products_fts ON products USING GIN (search_vector);

-- Search with relevance ranking — users type naturally
SELECT id, name, price,
  ts_rank(search_vector, query) AS rank
FROM  products,
  websearch_to_tsquery('english', 'wireless noise cancelling headphones') query
WHERE search_vector @@ query
ORDER BY rank DESC LIMIT 20;
```

`websearch_to_tsquery()` understands AND, OR, and quoted phrases — users type naturally and it works. Add `pg_trgm` for fuzzy matching on typos. GIN indexes wirks very fast at millions of rows.

**What you get out of the box:**

- **Weighted fields** — `setweight()` ranks title matches higher than body text, exactly like ES field boosting
- **50+ languages** — built-in stemming dictionaries for English, French, German, Portuguese, and more
- **Fuzzy matching** — `pg_trgm` handles typos and partial matches with no extra infrastructure
- **Transactional** — search index is always consistent with your data, no sync job, no divergence window

> **Threshold — relevance tuning, not document count.** The honest limit here is the relevance and not volume. BM25 scoring, synonyms, custom analyzers, and learning-to-rank there elasticsearch wins. document count is secondary: Postgres FTS is fast up to 10–20M docs; at 50M+ with complex filter combinations, p99 starts to drift. But if you hit a product relevance requirement before you hit 10M documents, consider migrating earlier.

---

## Kill #3 — Pinecone

pgvector brings vector similarity search directly into Postgres. The killer advantage: your embeddings live in the same database as your content. atomic joins between vector results and structured filters in a single query.

```sql
CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE document_chunks (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content    TEXT         NOT NULL,
  metadata   JSONB,
  embedding  VECTOR(1536),  -- OpenAI text-embedding-3-small
  created_at TIMESTAMPTZ  DEFAULT now()
);

-- HNSW index: faster queries, ideal for most use cases
CREATE INDEX idx_chunks_hnsw
  ON document_chunks USING hnsw (embedding vector_cosine_ops)
  WITH (m = 16, ef_construction = 64);

-- SET hnsw.ef_search = 100;  -- tune accuracy vs speed

-- Hybrid: vector similarity + metadata filter — one query, no sync
SELECT id, content, embedding <=> $1 AS dist
FROM   document_chunks
WHERE  metadata ->> 'source' = 'product_docs'
  AND  metadata ->> 'language' = 'en'
ORDER BY dist LIMIT 5;
```

**All three distance operators in one place:**

| Operator | Distance type | Best for |
|----------|--------------|----------|
| `<->` | Euclidean (L2) | Image embeddings, geometric similarity |
| `<=>` | Cosine | Text embeddings — insensitive to magnitude |
| `<#>` | Inner product | Pre-normalized embeddings |

> **Threshold — RAM** The HNSW index lives in RAM. At 1536 dimensions, 1M vectors ≈ 6GB of index memory. 5M vectors ≈ 30GB. The moment your HNSW index starts to get kicked from RAM, queries slow. watch the memory At ~20M+ vectors, Pinecone/dedicated ANN system win because their infrastructure is built for disk-resident indexes so Postgres can't even match.

---

## Kill #4 — MongoDB

The classic reason for reaching for MongoDB is "flexible schema" — JSONB gives you exactly that, while keeping your data ACID-compliant, transactional database as the rest of your models.

```sql
CREATE TABLE products (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT          NOT NULL,
  price_inr  NUMERIC(10,2) NOT NULL,
  attributes JSONB          -- flexible per-category schema
);

-- GIN index: all JSONB operators run fast
CREATE INDEX idx_products_attrs ON products USING GIN (attributes);

-- Containment — does this product match this sub-document?
SELECT * FROM products
WHERE attributes @> '{"color":"indigo","fabric":"silk"}';

-- Key existence check
SELECT * FROM products WHERE attributes ? 'ram_gb';

-- Surgical update — no full document rewrite
UPDATE products
SET attributes = jsonb_set(attributes, '{color}', '"navy"')
WHERE id = $1;

-- Add a key to every matching row
UPDATE products
SET attributes = attributes || '{"in_stock": true}'
WHERE attributes ? 'ram_gb';
```

> **Strongest replacement on this list, literally no threshold.** GIN + JSONB at 100M+ rows is still fast. you get full ACID guarantee, joins with structured columns, foreign keys, and a backup strategy.

---

## Kill #5 — InfluxDB — Time-series with TimescaleDB

Time-series data — APM metrics, IoT sensor readings, analytics events — has specific query patterns: "give me the p99 over the last hour, bucketed by 5 minutes." TimescaleDB is a Postgres extension that has these capabilities in without leaving your DB. It looks like a normal table to your application.

```sql
CREATE EXTENSION IF NOT EXISTS timescaledb;

CREATE TABLE metrics (
  time    TIMESTAMPTZ      NOT NULL,
  service TEXT             NOT NULL,
  metric  TEXT             NOT NULL,
  value   DOUBLE PRECISION,
  tags    JSONB
);

-- Automatic time-based partitioning under the hood
SELECT create_hypertable('metrics', 'time',
  chunk_time_interval => INTERVAL '1 week');

-- P99 response time per service, Prometheus-style rollup
SELECT
  time_bucket('5 minutes', time) AS bucket,
  service,
  percentile_cont(0.99) WITHIN GROUP (ORDER BY value) AS p99,
  avg(value) AS avg_ms
FROM  metrics
WHERE metric = 'response_time_ms'
  AND time > now() - INTERVAL '1 hour'
GROUP BY bucket, service
ORDER BY bucket DESC;

-- Continuous aggregate: auto-refreshed pre-computed rollup
CREATE MATERIALIZED VIEW metrics_5m
WITH (timescaledb.continuous) AS
SELECT time_bucket('5 minutes', time) AS bucket,
  service, avg(value) AS avg_val, max(value) AS max_val
FROM  metrics GROUP BY bucket, service;

-- Auto-refresh every 5 minutes, keep 30 days of raw data
SELECT add_continuous_aggregate_policy('metrics_5m',
  start_offset    => INTERVAL '1 hour',
  end_offset      => INTERVAL '5 minutes',
  schedule_interval => INTERVAL '5 minutes');

SELECT add_retention_policy('metrics', INTERVAL '30 days');
```

> **Threshold — ~100k rows/sec write.** TimescaleDB is great for product analytics, APM, and IoT at scale. The gap between dedicated TSDBs is the columnar compression ClickHouse can store the same data in 10× less space and we can query it 10× faster. Watch for WAL lag affecting your main transactional workload. When metrics ingestion starts competing with your primary DB's write, it's time to shift.

---

## Kill #6 — Kafka — Change Data Capture

Change Data Capture streams every row-level change (INSERT, UPDATE, DELETE) to downstream consumers search indexes, analytics systems, caches. Postgres has it built in via logical replication.

```sql
-- postgresql.conf: wal_level = logical

-- Create a replication slot (holds changes until consumed)
SELECT pg_create_logical_replication_slot(
  'my_app_slot',
  'pgoutput'  -- built-in decoder, no plugins needed
);

-- Publish specific tables
CREATE PUBLICATION app_pub
  FOR TABLE products, orders, inventory;

-- wal2json output gives clean JSON change events:
-- {"action":"I","table":"orders","columns":[{"name":"id","value":"..."}]}

-- CRITICAL: cap WAL retention to protect your primary
-- postgresql.conf: max_slot_wal_keep_size = 2GB
```

> **⚠ Most operationally risky swap on the list.** Replications hold WAL files until the consumer reads them. If your consumer lags or dies, WAL accumulates unboundedly and can fill disk and crash your primary instance — this has happened in production at real companies. Always set `max_slot_wal_keep_size` in postgresql.conf. This means accepting that a badly-lagging consumer gets its slot dropped and must re-sync. Use this pattern for 1–2 internal consumers (syncing to a search index, invalidating a cache). For fan-out to many consumers, guaranteed replay from arbitrary offsets, or complex ordering requirements: use Kafka or a managed tool like Sequin that wraps the complexity safely.

---

## The threshold guide

Every replacement has a different threshold. Here's the consolidated view — what breaks first and what metric tells you it's time to act.

| Instead of | Solid until | Monitor when | Migrate when | What breaks first |
|---|---|---|---|---|
| Unlogged tables vs **Redis cache** | ~5k ops/s | p99 read >3ms | p99 read >5ms sustained | Latency ceiling. Network + disk vs in-memory. |
| SKIP LOCKED vs **Redis queue** | ~500 jobs/s | Worker contention in pg_stat_activity | ~2k jobs/s | Row lock churn at high concurrency. |
| LISTEN/NOTIFY vs **Redis pub/sub** | ~100 listeners | — | Need delivery guarantees | No persistence. Missed NOTIFY = silent failure. |
| tsvector + GIN vs **Elasticsearch** | ~10M docs | Search p99 >100ms | p99 >200ms on filtered queries | Relevance tuning. BM25, synonyms, analyzers. |
| pgvector HNSW vs **Pinecone** | ~5M vectors | HNSW index RAM >40% of instance | RAM >60% of instance | Index lives in RAM. 1M × 1536-dim ≈ 6GB. |
| JSONB + GIN vs **MongoDB** | 100M+ rows | — | Need multi-master sharding | Strongest replacement. No real SaaS ceiling. |
| TimescaleDB vs **InfluxDB** | ~100k rows/s | WAL write lag on primary | ~1M rows/s | Columnar compression gap. ClickHouse wins at scale. |
| Logical replication vs **Kafka** | 1–2 consumers | Consumer lag accumulating | Fan-out or replay needed | WAL fills disk → primary crash. Most dangerous swap. |

---

### When not to...

The type of requirement will determine your requirements. If you need the following, reach for a dedicated tool immediately:

**Cache latency with a sub-millisecond response time:** If your SLA requires sub 1 millisecond reads of your cache at high frequency, use Redis.

**Tuning for search relevance on day one:** If you have requirements for product requirements such as familiarity with BM25 scoring, synonyms, and custom analyzers, you should use Elasticsearch from the beginning for your product.

**Billion-vector ANN search:** If you are using the pgvector extension for storing 5-20 million vectors using HNSW, your application will be production ready. If you're using pgvector for greater than 20M vectors, you will need a dedicated ANN solution (such as Qdrant, Weaviate, or Milvus) since pgvector does not meet the requirements for a disk-backed index.

**High-throughput time-series:** There are data management systems built specifically for this type of high-throughput time-series data. InfluxDB, and Prometheus work well for high-write applications due to their data management architecture, which is based on columnar compression and write optimization.

**Kafka-like functionality:** If you need to give out message delivery to more than 10 consumers, require guarantee order delivery, or offset-based message replay, a logical replication system does not meet your requirements. You should use Kafka.

**Working with complex LLM orchestration:** If your application relies on a single agent processing requests, a PL/pgSQL RAG function can handle that level of complexity. If your application requires a high level of complexity for coordinating the actions of multiple agents, then you will need a real framework.

### The pragmatic decision

**Under 50k MAU**: Postgres-everything. This gives you fewer failure modes, one backup strategy, atomic transactions over all your data. The cost for 6 different services is extremely real, and it impacts your product by a huge number.

**50k–500k MAU:** Monitor the specific metrics in the table above. Migrate the piece that's actually measured as a bottleneck.

**500k+ MAU:** You'll have dashboards showing the problem. By then you can afford the dedicated tool and the engineer who knows it.

Adding Redis at 1k users "because that's what everyone does." That trade hands you one ops problem and gives you five in return.

---

## The verdict

~~Redis~~ · ~~Elasticsearch~~ · ~~Pinecone~~ · ~~MongoDB~~ · ~~InfluxDB~~ · ~~Kafka CDC~~

↓

**PostgreSQL**

Is Postgres the right tool for every problem at every scale? no. But its the right place to start, for nearly all use cases. You should reach for the dedicated tool when you've actually encountered a real limit, not just because 'this is what everyone uses.'