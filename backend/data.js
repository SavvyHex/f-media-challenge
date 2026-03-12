export const dashboardStats = [
  {
    id: "total-validators",
    label: "Total validators",
    value: "1,024",
    trendLabel: "vs last epoch",
    trendValue: "+3.2%",
  },
  {
    id: "active-sessions",
    label: "Active sessions",
    value: "287",
    trendLabel: "concurrent",
    trendValue: "stable",
  },
  {
    id: "network-health",
    label: "Network health score",
    value: "92",
    trendLabel: "rolling 24h",
    trendValue: "healthy",
  },
];

export const recentEvents = [
  {
    id: "evt-1",
    title: "Validator heartbeat missed",
    description: "validator-032 stopped responding in the last window.",
    severity: "warning",
    timeAgo: "4 min ago",
  },
  {
    id: "evt-2",
    title: "New validator joined",
    description: "validator-1023 registered with standard stake.",
    severity: "info",
    timeAgo: "27 min ago",
  },
  {
    id: "evt-3",
    title: "Score drop detected",
    description: "validator-004 dropped below 50 performance score.",
    severity: "error",
    timeAgo: "1 h ago",
  },
];

export const validators = [
  {
    id: "val-001",
    name: "validator-001",
    status: "online",
    stake: "8,000 TAO",
    score: "96.3",
    lastHeartbeat: "2s ago",
    latency: "120 ms",
    region: "us-east-1",
  },
  {
    id: "val-002",
    name: "validator-002",
    status: "degraded",
    stake: "5,400 TAO",
    score: "71.8",
    lastHeartbeat: "18s ago",
    latency: "420 ms",
    region: "eu-west-1",
  },
  {
    id: "val-003",
    name: "validator-003",
    status: "offline",
    stake: "3,200 TAO",
    score: "—",
    lastHeartbeat: "12m ago",
    latency: "—",
    region: "ap-southeast-1",
  },
  {
    id: "val-004",
    name: "validator-004",
    status: "online",
    stake: "10,250 TAO",
    score: "88.1",
    lastHeartbeat: "5s ago",
    latency: "180 ms",
    region: "us-west-2",
  },
];

export const miners = [
  {
    id: "min-001",
    name: "miner-001",
    status: "online",
    hashrate: "12.4 TH/s",
    uptime: "99.2%",
    lastShare: "8s ago",
    region: "us-east-1",
  },
  {
    id: "min-002",
    name: "miner-002",
    status: "degraded",
    hashrate: "8.1 TH/s",
    uptime: "87.0%",
    lastShare: "2m ago",
    region: "eu-west-1",
  },
  {
    id: "min-003",
    name: "miner-003",
    status: "offline",
    hashrate: "—",
    uptime: "—",
    lastShare: "45m ago",
    region: "ap-southeast-1",
  },
  {
    id: "min-004",
    name: "miner-004",
    status: "online",
    hashrate: "15.0 TH/s",
    uptime: "99.8%",
    lastShare: "3s ago",
    region: "us-west-2",
  },
];
