# Mo — CV landing page

Static one-page CV (HTML/CSS/JS, no backend) served by nginx, ready for Coolify.

## Edit content
Everything lives in `site/content.js`. Replace every `[TODO]` (shown as a yellow **TODO** tag on the page, hidden in print).
Swap the photo by adding `site/assets/photo.jpg` and setting `photo: "assets/photo.jpg"`.

Preview locally: open `site/index.html` in a browser, or `docker compose up --build` and add `ports: ["8080:80"]` temporarily.

"Download PDF" uses the browser's print dialog with a clean print stylesheet.

## Deploy on Coolify (Docker Compose build pack)
1. Push this repo to GitHub (public or private).
2. Coolify → Project → **New Resource** → Public Repository (or Private via GitHub App / deploy key).
3. **Build Pack:** Docker Compose · **Base Directory:** `/` · **Docker Compose Location:** `/docker-compose.yaml`.
4. **Domains** → service `cv` → e.g. `https://cv.creativecode.com.eg` (internal port 80, so no `:port` needed).
5. Point the domain's DNS A record to the Coolify server (Cloudflare: proxied is fine with Full/Strict SSL).
6. **Deploy.** Health check: `/healthz`. Every push + redeploy (or enable auto-deploy webhook) publishes changes.

No environment variables or volumes are required.
