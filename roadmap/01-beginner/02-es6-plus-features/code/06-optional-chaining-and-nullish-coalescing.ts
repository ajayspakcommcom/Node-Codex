interface RequestContext {
  readonly actor?: {
    readonly email?: string;
    readonly preferences?: {
      readonly timezone?: string;
      readonly pageSize?: number;
    };
  };
}

function buildContextSummary(context: RequestContext): {
  readonly actorEmail: string;
  readonly timezone: string;
  readonly pageSize: number;
} {
  return {
    actorEmail: context.actor?.email ?? "anonymous",
    timezone: context.actor?.preferences?.timezone ?? "UTC",
    pageSize: context.actor?.preferences?.pageSize ?? 25,
  };
}

console.log(
  buildContextSummary({
    actor: {
      email: "ops@example.com",
      preferences: {
        timezone: "Asia/Kolkata",
        pageSize: 0,
      },
    },
  }),
);
