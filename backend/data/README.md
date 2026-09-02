# Knowledge Data Folder

Drop your company's knowledge files here — `.txt` or `.json` — then run:

```bash
cd backend
.venv\Scripts\python manage.py ingest_folder
```

Every `.txt`/`.json` file in this folder gets scraped into the AI's knowledge base (chunked, embedded, indexed) the same way a website URL or a dashboard upload would.

- **`.txt`** — plain text, one fact/paragraph per line is fine.
- **`.json`** — either a list of Q&A objects, e.g.:
  ```json
  [
    {"question": "What are your hours?", "answer": "9am-6pm, Monday to Friday"},
    {"question": "Do you offer refunds?", "answer": "Yes, within 14 days of purchase"}
  ]
  ```
  or a single object of key/value facts, e.g.:
  ```json
  {"service": "Web Design", "price": "$499", "delivery_time": "2 weeks"}
  ```

Re-running the script after editing a file re-indexes only what changed (content-hash check) — safe to run again any time you update these files.

This folder is for local/offline ingestion. It has no effect on its own; you must run `manage.py ingest_folder` after adding or changing files here.
