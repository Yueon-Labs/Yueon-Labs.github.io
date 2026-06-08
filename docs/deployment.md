# Deployment Workflow

This repository deploys the AIGC-X organization site to the GCP VM after `main` is updated.

## Daily Change Flow

1. Start from the latest `main`.
2. Create a branch for every change.
3. Preview locally before committing.
4. Commit only after the local preview looks right.
5. Push the branch and merge after review.
6. Merging to `main` triggers the production deployment workflow.

Commit and PR descriptions should read like a human developer wrote them and include `我是王越`.

## Local Preview

Run this from the repository root:

```powershell
python -m http.server 8088 --bind 127.0.0.1
```

Then open:

```text
http://127.0.0.1:8088/
```

## Production Deployment

GitHub Actions workflow:

```text
.github/workflows/deploy.yml
```

Trigger:

- push to `main`
- manual `workflow_dispatch`

Target:

```text
Public URL: http://www.yueanlab.com/
GCP VM: hk-org-web-1
Nginx root: /var/www/aigcwzu
```

Required repository secrets:

```text
GCP_DEPLOY_HOST
GCP_DEPLOY_USER
GCP_DEPLOY_PORT
GCP_DEPLOY_SSH_KEY
GCP_DEPLOY_KNOWN_HOSTS
```

## Rollback

Use Git history as the rollback mechanism:

```powershell
git revert <bad-commit-sha>
git push origin main
```

The deployment workflow will redeploy the reverted version.
