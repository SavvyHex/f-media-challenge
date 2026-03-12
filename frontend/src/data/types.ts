export interface DashboardStat {
  id: string;
  label: string;
  value: string;
  trendLabel: string;
  trendValue: string;
}

export interface RecentEvent {
  id: string;
  title: string;
  description: string;
  severity: "info" | "warning" | "error";
  timeAgo: string;
}

export interface Validator {
  id: string;
  name: string;
  status: "online" | "offline" | "degraded";
  stake: string;
  score: string;
  lastHeartbeat: string;
  latency: string;
  region: string;
}

export interface Miner {
  id: string;
  name: string;
  status: "online" | "offline" | "degraded";
  hashrate: string;
  uptime: string;
  lastShare: string;
  region: string;
}
