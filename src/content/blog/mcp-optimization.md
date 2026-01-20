---
title: 'MCP - why agents work best with you, not instead of you'
description: 'Why less is more.'
pubDate: 18-12-2025
---

### MCP - More Context Problems? Hmm...

Built a small local mcp server just to test the hype, watched youtube tutorials, read the documentation and tried everything to understand how it actually works. i connected leetcode, notion, github servers, local db, json and more. turns out after 7-8 interactions my chat context was filling up fast. So, thought i was calling tools very often, but -- this was the expected behavior according to [<u>anthorpic</u>](https://www.anthropic.com/engineering/code-execution-with-mcp) itself.

Every tool call, description, schema, response, was being fed into context, and this happens almost each time the llm tries to interact, the agent dumps all this info into the model's context so that can be huge if you connect many MCP servers

When tools return **large datasets** (like a 10,000-row spreadsheet), the model has to reason over that entire thing in its context window.
If you have hundreds of tools, that easily eats **thousands of tokens** before even starting work.  
	 Example: ~150,000 tokens just from tool definitions before any reasoning starts.
