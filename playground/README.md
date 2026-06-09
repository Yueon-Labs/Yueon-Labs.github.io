# AIGC-X Playground Submissions

Each competition entry lives in its own folder:

```text
playground/submissions/your-entry/index.html
```

Then add it to `playground/submissions.json`:

```json
{
  "id": "your-entry",
  "title": "Your Entry Title",
  "author": "Your Name",
  "description": "Short description of the design.",
  "tags": ["html", "design"],
  "url": "./submissions/your-entry/index.html"
}
```

Guidelines:

- Keep the entry self-contained when possible.
- Prefer local CSS and local assets inside your submission folder.
- Avoid trackers, external scripts, forms, and credential collection.
- The gallery previews entries inside a sandboxed iframe.
