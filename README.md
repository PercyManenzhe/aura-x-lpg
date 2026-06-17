# Aura-X LPG Platform

This repository contains a Python FastAPI backend and a Next.js frontend for the Aura-X LPG platform.

## Local setup

### Backend

1. Create a virtual environment and activate it:

```powershell
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
```

2. Install dependencies:

```powershell
pip install fastapi uvicorn
```

3. Run the backend:

```powershell
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

The backend API will be available at `http://127.0.0.1:8000`.

### Frontend

1. Install packages:

```powershell
cd frontend
npm install
```

2. Run the frontend development server:

```powershell
npm run dev
```

The frontend will be available at `http://localhost:3000`.

## GitHub push status

The repository is already pushed to GitHub and the local `main` branch is synced with `origin/main`.

## Notes

- Do not commit `node_modules` or generated build folders.
- If you change the backend or frontend dependencies, run the install command again.
