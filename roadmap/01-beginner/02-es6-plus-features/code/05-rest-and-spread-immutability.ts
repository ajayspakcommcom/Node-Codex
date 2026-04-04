interface ServiceConfig {
  readonly retries: number;
  readonly timeoutMs: number;
  readonly cacheEnabled: boolean;
}

interface UserSession {
  readonly id: string;
  readonly status: "active" | "revoked";
  readonly metadata: {
    readonly source: string;
  };
}

const baseConfig: ServiceConfig = {
  retries: 2,
  timeoutMs: 1000,
  cacheEnabled: true,
};

const productionConfig: ServiceConfig = {
  ...baseConfig,
  timeoutMs: 5000,
};

function revokeSession(session: UserSession): UserSession {
  return {
    ...session,
    status: "revoked",
  };
}

function collectMetrics(label: string, ...durationsMs: number[]): { label: string; count: number; max: number } {
  return {
    label,
    count: durationsMs.length,
    max: Math.max(...durationsMs),
  };
}

console.log("Production config:", productionConfig);
console.log(
  "Revoked session:",
  revokeSession({ id: "ses_10", status: "active", metadata: { source: "mobile" } }),
);
console.log("Metrics:", collectMetrics("database", 20, 40, 55));
