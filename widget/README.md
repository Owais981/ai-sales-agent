# Website Chat Widget

A single, framework-free JavaScript file (`novulabs-chat-widget.js`) that adds a floating chat button + panel to any website — no build step, no dependency on the host site's tech stack (React, WordPress, static HTML, anything works). Styles are fully isolated via Shadow DOM, so it can't be broken by (or break) your site's existing CSS.

It talks to the backend's public `/api/website-chat/*` endpoint, which runs the exact same AI pipeline as WhatsApp and the dashboard's Test Chat — same knowledge base, same lead detection. A visitor who shows buying interest becomes a real lead, visible on the **Leads** dashboard page alongside WhatsApp leads (tagged `web-<session>` so you can tell them apart).

## Try it locally

```bash
cd widget
python -m http.server 8080
```

Open `http://localhost:8080/demo.html` — click the round button in the bottom-left corner. Make sure the backend is running on `http://localhost:8000` and that `CORS_ORIGINS` in `backend/.env` includes `http://localhost:8080` (already set up for this demo).

## Add it to your real website (novulabs.net)

Paste this before `</body>` on every page you want the widget on:

```html
<script
  src="https://your-backend-domain.example/static/novulabs-chat-widget.js"
  data-api-url="https://your-backend-domain.example"
  data-position="left"
  data-title="Chat with NovuLabs"
  data-primary-color="#0f766e"
  data-greeting="Hi! Ask me anything about our services, pricing, or how we work."
></script>
```

Where to host `novulabs-chat-widget.js` is up to you — copy it alongside your site's other static assets, or serve it from the backend itself (e.g. Django's static files handling) so there's one less thing to deploy separately.

### Required

- **`data-api-url`** — your deployed backend's base URL. The widget will call `POST {data-api-url}/api/website-chat/{session}/messages`.
- **On the backend**, add your real website's origin to `CORS_ORIGINS` in `.env` (e.g. `CORS_ORIGINS=https://novulabs.net`), or browsers will block the widget's requests. Multiple origins are comma-separated.

### Optional attributes

| Attribute | Default | Meaning |
|---|---|---|
| `data-position` | `left` | `left` or `right` — which corner the widget sits in |
| `data-title` | `Chat with us` | Header text in the chat panel |
| `data-primary-color` | `#0f766e` | Accent color (launcher button, header, customer bubbles) — set to your brand color |
| `data-greeting` | generic | First message shown to a visitor with no prior history |
| `data-suggested-questions` | 3 generic questions (see below) | Pipe-separated list of clickable quick-question chips shown alongside the greeting, e.g. `data-suggested-questions="What services do you offer?\|What is the pricing?\|How do I get started?"`. Clicking one sends it immediately. |

Default suggested questions (used if the attribute is omitted): "What services do you offer?", "What is the pricing?", "How do I get started?" — generic enough to fit any services business; override with your own via `data-suggested-questions` if you want something more specific.

## How it works

- Each visitor gets a random session id, stored in their browser's `localStorage` (`novulabs_website_chat_session_id`) — so reloading the page keeps the same conversation, but a different visitor/browser gets a separate one.
- No login, no cookies, no visitor identification beyond that session id — this is a public, anonymous endpoint by design.
- Rate-limited server-side (8 messages/minute per session) to protect the LLM API budget from abuse, since — unlike every other endpoint in this project — it isn't behind dashboard auth.
- Message length is capped at 2000 characters.

## Security note

This endpoint is intentionally public. It does **not** expose anything sensitive (no admin data, no other visitors' conversations — sessions are isolated by their random id). The main risk is cost/abuse from spam, which the per-session rate limit mitigates. If you need stronger protection (e.g. against a scripted attacker rotating session ids), consider adding IP-based rate limiting or a CAPTCHA at your reverse proxy/CDN layer in front of the backend.
