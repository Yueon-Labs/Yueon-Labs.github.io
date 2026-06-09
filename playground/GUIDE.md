# AIGC-X Playground Guide

AIGC-X Playground is designed to become a diverse public space for experiments, competitions, demos, tools, art pages, agent interfaces, model showcases, and future services.

## What can live here

Supported entry types:

- Static HTML design pages
- Interactive visual experiments
- AI tool demos with a static frontend
- Product prototypes
- Documentation mini-sites
- Competition submissions
- Future service launch pages

If an entry needs a backend, keep the frontend in Playground and connect it to a reviewed API route such as `/api/...`.

## Directory structure

Each entry owns one folder:

```text
playground/submissions/<entry-id>/index.html
```

Optional local assets should stay inside the same folder:

```text
playground/submissions/<entry-id>/
  index.html
  style.css
  script.js
  assets/
```

## Metadata

Every entry must be listed in:

```text
playground/submissions.json
```

Example:

```json
{
  "id": "your-entry-id",
  "title": "Your Entry Title",
  "author": "Your Name or Team",
  "description": "One short sentence about the work.",
  "tags": ["html", "design", "prototype"],
  "url": "./submissions/your-entry-id/index.html"
}
```

Rules:

- `id` should use lowercase letters, numbers, and hyphens.
- `url` should point to the entry `index.html`.
- Keep descriptions short and public-facing.
- Tags should describe the type or style of the entry.

## Safety and review rules

Playground entries are previewed inside a sandboxed iframe.

Allowed:

- Self-contained HTML/CSS/JS
- Local assets inside your folder
- Canvas/WebGL visual experiments
- Static data files

Not allowed without review:

- Credential collection
- Payment forms
- Tracking scripts
- Remote third-party scripts
- Destructive actions
- Hidden redirects
- Downloads that auto-start
- API keys in frontend code

## Backend-ready pattern

For future services, use this split:

```text
/playground/submissions/<entry-id>/index.html  # frontend demo
/api/<service-name>/...                        # backend API route
```

Recommended backend hosting:

- Cloud Run for APIs and service backends
- Secret Manager for private keys
- Firestore or Cloud SQL for data
- Nginx or load balancer routes for `/api/*`

## Submission checklist

Before submitting:

- The entry opens locally.
- The entry is listed in `submissions.json`.
- No secrets or API keys are included.
- External scripts are avoided or clearly explained.
- The design works at desktop and mobile sizes.
- The page has a meaningful title.

## Future categories

Suggested long-term categories:

- Competition
- Tools
- Agents
- Models
- Robotics
- Video
- Design
- Research
- Docs
- Services

The current gallery is intentionally simple so it can grow into a bigger hub later.
