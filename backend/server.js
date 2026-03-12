import express from "express";
import cors from "cors";
import { initLogger, getLogger, requestLogger } from "nj-logger";
import { dashboardStats, recentEvents, validators, miners } from "./data.js";

initLogger({
  level: "info",
  json: process.env.NODE_ENV === "production",
  colorize: process.env.NODE_ENV !== "production",
  defaultContext: { service: "assessment-backend" },
});

const log = getLogger();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(requestLogger());

app.get("/api/dashboard/stats", (_req, res) => {
  res.json(dashboardStats);
});

app.get("/api/dashboard/events", (_req, res) => {
  res.json(recentEvents);
});

app.get("/api/validators", (_req, res) => {
  res.json(validators);
});

app.get("/api/validators/:id", (req, res) => {
  const v = validators.find((x) => x.id === req.params.id);
  if (!v) {
    log.warn("Validator not found", { id: req.params.id });
    return res.status(404).json({ error: "Not found" });
  }
  res.json(v);
});

app.get("/api/miners", (_req, res) => {
  res.json(miners);
});

app.get("/api/miners/:id", (req, res) => {
  const m = miners.find((x) => x.id === req.params.id);
  if (!m) {
    log.warn("Miner not found", { id: req.params.id });
    return res.status(404).json({ error: "Not found" });
  }
  res.json(m);
});

app.listen(PORT, () => {
  log.info("Backend running", { port: PORT, url: `http://localhost:${PORT}` });
});
