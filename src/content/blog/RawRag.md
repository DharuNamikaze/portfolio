---
title: "RawRAG - RAG implementation from scratch"
description: "Why less is more..."
pubDate: "28-03-2026"
tags: ["RAG", "FromScratch", "Implementation"]
---

![Vangough Drawing](/diagrams/vangough.jpg)

## the lore

Actually, I got this idea while applying for a SWE role at an AI startup. I thought the assessment was about writing code but it was about how I think.

instead of building something, i was asked to design an evaluation set — defining queries and analyzing the retrieved results. the goal was to distinguish between strong retrieval and weak retrieval, and to reason about why.

so here we are... i'll walk through how i approached it. But instead we’ll go by building a RAG system from scratch, without any libraries. becuase it's fun.

## intro

**What is RAG**: Retrieval-Augmented Generation, The core idea is dead simple: instead of asking an LLM to answer from memory (which causes hallucinations), you first fetch the relevant facts, then hand them to the LLM along with the question, and say "answer using only this."

**Why it exists**: LLMs have a knowledge cutoff, they can't access private data, and confidently make things up. RAG fixes all three.

Think of it like an open-book exam. The LLM is the student. Without RAG, you're asking them to recall everything from memory. With RAG, you hand them the exact pages they need — and the answer quality jumps dramatically.

the whole pipeline looks like this:

- Indexing (Offline)
    - 
- Querying (Online, per request)





![Hellp](/diagrams/rag1light.svg)
