interface UserFilter {
  readonly status?: "active" | "disabled";
  readonly role?: "admin" | "member";
}

interface QueryParts {
  readonly status?: string;
  readonly role?: string;
}

function badBuildQuery(filter: UserFilter): QueryParts {
  return {
    status: filter.status || undefined,
    role: filter.role || undefined,
  };
}

function goodBuildQuery({ status, role }: UserFilter): QueryParts {
  return {
    ...(status ? { status } : {}),
    ...(role ? { role } : {}),
  };
}

async function badLoadSummaries(userIds: readonly string[]): Promise<readonly string[]> {
  const summaries: string[] = [];

  for (const userId of userIds) {
    const summary = await Promise.resolve(`summary:${userId}`);
    summaries.push(summary);
  }

  return summaries;
}

async function goodLoadSummaries(userIds: readonly string[]): Promise<readonly string[]> {
  return Promise.all(userIds.map(async (userId) => Promise.resolve(`summary:${userId}`)));
}

async function main(): Promise<void> {
  console.log("Bad query:", badBuildQuery({ status: "active" }));
  console.log("Good query:", goodBuildQuery({ status: "active" }));
  console.log("Bad summaries:", await badLoadSummaries(["u1", "u2"]));
  console.log("Good summaries:", await goodLoadSummaries(["u1", "u2"]));
}

void main();
