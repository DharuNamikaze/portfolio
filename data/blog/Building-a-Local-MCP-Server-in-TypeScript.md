---
title: "Building a Local MCP Server in Typescript"
date: "2025-08-05"
tags: ["MCP", "Typescript", "AI", "LLM"]
---

# Introduction to MCP
##### asd
This post walks through setting up a local MCP (Model Context Protocol) server using TypeScript. If you're experimenting with AI workflows or looking to plug database, APIs and files into models, MCP is a right way to get started.

We'll cover:
- Project setup
- Transport options (connection)
- The MCP Inspector
- Handling errors
- Working with real tools and resources
  - File systems
  - External APIs
  - Databases
- Running things with Copilot and Ollama models

According to the list of MCP Clients listed by Anthropic so far: [modelcontextprotocol.io/clients](https://modelcontextprotocol.io/clients), VS Code Copilot is the current reference implementation of an MCP client. 