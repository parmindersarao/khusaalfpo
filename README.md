# Project Setup Guide

This repo has two apps:

- Backend: FastAPI API server
- Frontend: Next.js app

They run separately, but the frontend calls the backend on port 8000.

---

## 1) Prerequisites

Before running the project, make sure you have:

- Python 3.12+
- Node.js 18+
- npm
- uv (recommended for Python dependency management)

Check versions:

```bash
python --version
node --version
npm --version
uv --version
```

---

## 2) Run the backend

Open a terminal in the backend folder:

```bash
cd backend
uv sync
uv run uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

This starts the FastAPI server at:

- http://127.0.0.1:8000

To confirm the backend is running, open this in the browser or use curl:

```bash
curl http://127.0.0.1:8000/api/v1/health
```

Expected response:

```json
{"status":"ok","message":"Connected to FastAPI backend successfully!"}
```

If you see that JSON, the backend is working.

---

## 3) Run the frontend

Open a second terminal and run:

```bash
cd frontend
npm install
npm run dev
```

This starts the Next.js app at:

- http://localhost:3000

Open that URL in your browser.

---

## 4) Setup frontend environment variables

Create a file named `.env.local` inside the frontend folder:

```bash
cd frontend
nano .env.local
```

Add this:

```env
BACKEND_URL=http://127.0.0.1:8000
```

This tells the frontend where the backend is running.

Important:

- The file must be named `.env.local`
- It must live in the `frontend/` folder
- It is used by Next.js during local development

---

## 5) Confirm whether frontend and backend are connected

There are two good checks.

### Check 1: Backend health endpoint

In the browser:

```text
http://127.0.0.1:8000/api/v1/health
```

This should return JSON from FastAPI.

### Check 2: Frontend health page

In the browser:

```text
http://localhost:3000/api/v1/health
```

This is a Next.js route that calls the backend internally. If the backend is reachable, the page should show a green "Operational" status.

If the backend is down, it will show "Offline".

### Check 3: Browser dev tools

Open the browser dev tools and inspect the network requests:

- frontend should call: `http://127.0.0.1:8000/api/v1/health`
- response status should be `200 OK`

If you see a CORS error or failed request, it usually means:

- backend server is not running
- backend is running on another port
- frontend `.env.local` is wrong
- backend CORS settings do not allow the frontend origin

---

## 6) Typical troubleshooting

### Backend not starting

Run:

```bash
cd backend
uv sync
```

Then start again:

```bash
uv run uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

### Frontend cannot connect to backend

Check these values:

```env
BACKEND_URL=http://127.0.0.1:8000
```

Also make sure the backend is running on port 8000.

### CORS error

The backend currently allows common localhost origins, but if your app uses a different origin, add it in `backend/app/main.py`.

For example, make sure it includes:

```python
"http://localhost:3000",
"http://127.0.0.1:3000"
```

---

## 7) Quick start summary

Run these in two terminals:

### Terminal 1 - backend

```bash
cd backend
uv sync
uv run uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

### Terminal 2 - frontend

```bash
cd frontend
npm install
cat > .env.local <<'EOF'
BACKEND_URL=http://127.0.0.1:8000
EOF
npm run dev
```

Then verify:

- Backend: http://127.0.0.1:8000/api/v1/health
- Frontend: http://localhost:3000/api/v1/health

If both respond correctly, the apps are connected.

---

## 8) Final note

The backend is the API server, and the frontend is the user interface. The frontend will not work properly without the backend running and the `.env.local` file pointing to the correct backend URL.

If you follow the steps above, you should be able to run both apps locally and verify that they communicate with each other.
