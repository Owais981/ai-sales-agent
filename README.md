# AI Sales & Lead Agent

An AI sales assistant — reachable on WhatsApp and as an embeddable widget on your website — that answers customer questions from your website content (RAG), detects buying intent, automatically creates leads, notifies your Sales Manager, and lets them take over the conversation without the customer repeating anything. Both channels share the exact same pipeline: same knowledge base, same lead detection, same dashboard.

Built to the requirements in `AI_Sales_Lead_Agent_Requirements.md`.

## Stack

- **Backend:** Python 3.12, Django 5, Django REST Framework, PostgreSQL (SQLite for local dev)
- **Frontend:** React 19, Vite, TypeScript, Tailwind CSS 4
- **LLM:** Google Gemini (chat, intent classification, embeddings)
- **Auth:** JWT (dashboard/API), WhatsApp webhook signature verification

## Project Layout

```
backend/
  manage.py
  config/          Django project (settings, urls, wsgi, asgi)
  app/             single Django app - everything lives here
    models.py         Customer, Conversation, Message, Lead, KnowledgeDocument, KnowledgeChunk, User
    serializers.py     DRF request/response serializers
    views.py           APIViews (auth, whatsapp, website_chat, test_chat, conversations, leads, knowledge, dashboard)
    urls.py            API routes
    authentication.py  DRF authentication class wrapping the JWT scheme
    security.py        JWT/password hashing
    logging.py         Secret-redacting log filter
    services/          Business logic (whatsapp, ai, rag, intent, lead, notification, knowledge, conversation)
    management/commands/  bootstrap_admin, ingest_folder (drop .txt/.json files in backend/data/ and run this to index them)
    migrations/        DB migrations
  data/              Drop-in knowledge files for ingest_folder (see backend/data/README.md)
frontend/            Sales Manager dashboard (React + Vite + Tailwind)
  src/
    components/ui/    Reusable primitives (Button, Card, Badge, Input, Select, Spinner, EmptyState)
    components/layout/ Sidebar, TopBar, AppLayout, ProtectedRoute
    components/        Feature components (LeadTable, ConversationList, MessageBubble, KnowledgeTable, ...)
    pages/             Login, Dashboard, Leads, Conversations, ConversationDetail, TestChat, Knowledge, Settings
    api/               Typed API client functions
    context/           AuthContext
widget/               Embeddable public website chat widget (framework-free JS) - see widget/README.md
```

## A note on two implementation deviations

These were forced by this specific dev machine, not by the requirements:

1. **Vector storage:** the plan was pgvector-in-Postgres, but this Windows machine has no Postgres/pgvector install available (network-restricted, and pgvector requires compiling a native extension). Embeddings are instead stored as a plain JSON float array on `KnowledgeChunk.embedding`, with cosine similarity computed in Python (`rag_service.py`). This still lives in the same Postgres database in production — no extra service — and is easily swapped for a native `vector` column + `<=>` operator later if you install the pgvector extension; the retrieval scope (a handful of website pages) doesn't need ANN indexing.
2. **Python version:** only Python 3.14 was preinstalled, which has no prebuilt wheels yet for `pydantic-core`/`asyncpg`/`lxml`. Installed Python 3.12 via winget alongside it; the backend venv (`backend/.venv`) is built against 3.12.

## Setup

### 1. Database

You need PostgreSQL 14+ running somewhere reachable. Easiest via Docker:

```bash
docker compose up -d db
```

Or point `DATABASE_URL` at any existing Postgres instance. No extensions required (see note above).

### 2. Backend

```bash
cd backend
py -3.12 -m venv .venv
.venv\Scripts\pip install -r requirements.txt
copy .env.example .env
# edit .env: set DATABASE_URL, GEMINI_API_KEY, WhatsApp credentials, etc.

.venv\Scripts\python manage.py migrate
.venv\Scripts\python manage.py bootstrap_admin     # creates first dashboard login from FIRST_ADMIN_EMAIL/PASSWORD
.venv\Scripts\python manage.py runserver 8000
```

DRF's browsable API is available at any endpoint when opened in a browser (e.g. `http://localhost:8000/api/leads/`).

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

Opens on `http://localhost:5173` (or the next free port). The Vite dev server proxies `/api/*` to `http://localhost:8000` (see `vite.config.ts`). Log in with the admin email/password you set in `backend/.env`.

For a production build, serve `frontend/dist` (from `npm run build`) behind the same origin/reverse proxy as the backend so `/api` calls resolve correctly, or set up a proxy rule at your web server.

### 4. Website knowledge ingestion

Once logged in, go to **Knowledge Management** and add page URLs one at a time (About Us, Services, Pricing, FAQ). Each is scraped, cleaned, chunked, embedded, and indexed in the background — status updates automatically. Re-ingesting a URL whose content hasn't changed is a no-op (content hash check); use **Re-index** to force it.

This can also be driven via API: `POST /api/knowledge/ingest {"url": "..."}`.

### 5. Website chat widget

A standalone, dependency-free JS file you drop into your real website (`widget/novulabs-chat-widget.js`) — full instructions, embedding snippet, and a local demo page are in `widget/README.md`. It talks to the public `POST /api/website-chat/{session}/messages` endpoint, running through the exact same RAG/lead pipeline as WhatsApp, just without login (visitors are anonymous, identified only by a browser-local session id). Add your real website's origin to `CORS_ORIGINS` in `.env` before going live.

There's also a **Test Chat** page in the dashboard (no widget/website needed) for trying the agent directly as a logged-in Sales Manager — useful for verifying answers before wiring up WhatsApp or the widget.

### 6. WhatsApp setup

1. Create a Meta app with the WhatsApp product at [developers.facebook.com](https://developers.facebook.com).
2. Get a phone number ID and a permanent access token.
3. Set `WHATSAPP_ACCESS_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID`, `WHATSAPP_APP_SECRET` in `.env`.
4. Set `WHATSAPP_VERIFY_TOKEN` to any string of your choosing, and configure the same value in the Meta webhook setup.
5. Configure the webhook URL in Meta's dashboard as `https://<your-domain>/api/whatsapp/webhook` (needs a public HTTPS URL — use a tunnel like ngrok for local testing).
6. Subscribe the webhook to the `messages` field.

Without these credentials the app still runs: incoming webhook calls are still processed (customer, conversation, AI reply, lead, all still work), but outbound sends are logged instead of actually delivered to WhatsApp (see `WhatsAppService.is_configured`).

### 7. Sales Manager notifications

Set `NOTIFICATION_CHANNEL` in `.env`:
- `log` (default) — notification is written to the server log. Works with zero configuration; good enough to start with, and visible on the dashboard regardless.
- `whatsapp` — sends to `SALES_MANAGER_WHATSAPP_NUMBER` via the same WhatsApp service (needs WhatsApp configured).
- `email` — sends to `SALES_MANAGER_EMAIL` via local SMTP (needs an SMTP relay reachable at `localhost:25`, or adjust `notification_service.py` for your provider).

New leads are always visible on the dashboard regardless of notification channel.

## How the Sales Manager uses the dashboard

1. **Dashboard** — at-a-glance stats (total/new leads, active conversations, human handovers) and the 5 most recent leads.
2. **Leads** — every lead with customer, phone, interested-in, AI-generated summary, and a status dropdown (New → Contacted → Qualified → Converted/Lost). Website-widget leads are tagged `web-<session>`, WhatsApp leads show a real phone number, test-chat leads are tagged `test-<session>`.
3. **Conversations** — every conversation (WhatsApp, website widget, and dashboard test chats) with its current state (AI Active / Human Requested / Human Active / Closed).
4. **Conversation detail** — full message history (customer, AI, and sales manager messages, all timestamped). Click **Take Over** to pause the AI and start replying directly — the customer sees no interruption and never has to repeat themselves. Click **Release to AI** to hand it back.
5. **Test Chat** — converse with the agent directly as yourself, no WhatsApp/website needed, to sanity-check answers.
6. **Knowledge Management** — add website page URLs or uploaded files, see indexing status, re-index on demand.
7. **Settings** — account info and basic system/API status.

## How human handover works

- AI replies automatically while a conversation is `AI_ACTIVE`.
- Strong buying intent or an explicit request for a human moves the conversation to `HUMAN_REQUESTED`, creates a lead (deduplicated per conversation — repeated interested messages don't spam new leads), and notifies the sales manager.
- Once a manager clicks **Take Over**, status becomes `HUMAN_ACTIVE`: the AI stops replying automatically, and manager messages sent from the dashboard go out over WhatsApp as themselves (for WhatsApp conversations) or are saved for the widget/test-chat conversation. All messages (from customer, AI, or manager) are saved to the same conversation thread throughout.
- **Release to AI** returns the conversation to automatic replies.
- This works identically regardless of channel (WhatsApp, website widget, or Test Chat) — they all run through the same conversation/lead/handover pipeline.

## Requirement checklist (FR1–FR11)

| # | Requirement | Status |
|---|---|---|
| FR1 | WhatsApp Business connection | **PASS** (official Cloud API, webhook verify + signature check, `WhatsAppService` abstraction) — needs real WhatsApp credentials for live send/receive |
| FR2 | 24/7 auto-reply | **PASS** — verified live: webhook → background task → AI reply, non-blocking |
| FR3 | Answers from website data (RAG) | **PASS** — full scrape → chunk → embed → retrieve → grounded LLM pipeline, verified live end-to-end (WhatsApp webhook, Test Chat, and the public website widget) against a real 57-chunk knowledge base — needs `GEMINI_API_KEY` for real embeddings/answers (falls back to a safe static reply without one). Retrieval uses `RAG_TOP_K=10` with Gemini's `RETRIEVAL_DOCUMENT`/`RETRIEVAL_QUERY` task types for search quality. |
| FR4 | Knowledge stays updated | **PASS** — ingest/re-index endpoints, content-hash change detection avoids needless re-embedding |
| FR5 | English/Urdu/Roman Urdu understanding | **PASS** via Gemini; bilingual keyword fallback also implemented and tested — full NLU quality needs `GEMINI_API_KEY` |
| FR6 | Buying/sales intent detection | **PASS** — dedicated `IntentService`, tested |
| FR7 | Automatic lead creation | **PASS** — duplicate-prevented per conversation, tested and verified live |
| FR8 | Sales Manager notification | **PASS** (log channel works out of the box; whatsapp/email channels need their own credentials) |
| FR9 | Smooth human handover | **PASS** — verified live: takeover, manager reply, release, full history preserved |
| FR10 | Chat history saved | **PASS** — every message stored with sender type, direction, timestamp |
| FR11 | Multiple concurrent chats | **PASS** — isolated per-conversation state, tested explicitly |

**Needs configuration before full production use:** `GEMINI_API_KEY` on a billed (not free-tier) plan — the free tier caps at 20 requests/day, which is exhausted almost immediately even during setup/testing — `WHATSAPP_ACCESS_TOKEN`/`WHATSAPP_PHONE_NUMBER_ID`/`WHATSAPP_APP_SECRET`, a reachable `DATABASE_URL` (Postgres), and a public HTTPS URL for the webhook. Everything else runs today with zero external credentials (verified end-to-end against SQLite in this environment).

**Beyond the original FR1–FR11 scope:** a public embeddable website chat widget (`widget/`) was added on top of the same pipeline, alongside WhatsApp — see `widget/README.md`.
