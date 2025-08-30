# How to Add Blog Posts

Adding a new blog post is simple! Just follow these steps:

## 1. Create a New Markdown File

Create a new `.md` file in this directory with a URL-friendly name:
- `my-awesome-post.md`
- `learning-nextjs.md`
- `web-development-tips.md`

## 2. Add Frontmatter   
    
At the top of your file, add YAML frontmatter:

```yaml
---
title: "Your Post Title"
date: "YYYY-MM-DD"
tags: ["tag1", "tag2", "tag3"]
---
```

## 3. Write Your Content

Write your blog post using Markdown syntax below the frontmatter.

## Example

```markdown
---
title: "My Amazing Post"
date: "2024-12-19"
tags: ["javascript", "tutorial"]
---

# My Amazing Post

This is the content of my amazing blog post!

## Subheading

- List item 1
- List item 2

**Bold text** and *italic text* work too!
```

## 4. That's It!

The blog post will automatically appear on:
- The blog section on the homepage
- The dedicated blog page at `/blog`
- Individual post page at `/blog/your-post-slug`

No need to restart the server - Next.js will hot-reload the changes!