# Assessment Backend

Simple Express API that serves mock data for the Zeus styling assessment frontend.

## Run

```bash
npm install
npm start
```

Server runs at `http://localhost:3001`. Use a separate terminal for the frontend (see main assessment README).

## API

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/dashboard/stats` | Dashboard stat cards |
| GET | `/api/dashboard/events` | Recent activity events |
| GET | `/api/validators` | List of validators |
| GET | `/api/validators/:id` | Single validator |
| GET | `/api/miners` | List of miners |
| GET | `/api/miners/:id` | Single miner |

## Data

- **`data.js`** – In-memory mock data for stats, events, validators, and miners. No database; data is fixed for the assessment.

## Logging

Logging uses **nj-logger**. The server calls `initLogger()` at startup (level `info`, JSON in production, colorized in development) and mounts the `requestLogger()` Express middleware so each request is logged with a request id. Startup and 404s for invalid validator/miner ids are also logged.

## Stack

- Node 18+
- Express, CORS, nj-logger
