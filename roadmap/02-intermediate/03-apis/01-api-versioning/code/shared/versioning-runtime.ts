import type { ApiVersion } from "./order-contracts.js";

export interface RequestContext {
  readonly path: string;
  readonly method: "GET" | "POST";
  readonly headers?: Readonly<Record<string, string | undefined>>;
  readonly body?: unknown;
  readonly consumerId?: string;
}

export interface ResponseEnvelope {
  readonly statusCode: number;
  readonly headers: Readonly<Record<string, string>>;
  readonly body: unknown;
}

export interface VersionPolicy {
  readonly defaultVersion: ApiVersion;
  readonly supportedVersions: readonly ApiVersion[];
  readonly deprecatedVersions: readonly ApiVersion[];
  readonly sunsetByVersion: Readonly<Partial<Record<ApiVersion, string>>>;
  readonly successorByVersion: Readonly<Partial<Record<ApiVersion, ApiVersion>>>;
}

export interface ResolvedVersion {
  readonly version: ApiVersion;
  readonly source: "path" | "header" | "default";
}

const VERSION_HEADERS = ["x-api-version", "accept-version"] as const;

export function createDefaultVersionPolicy(): VersionPolicy {
  return {
    defaultVersion: "v2",
    supportedVersions: ["v1", "v2"],
    deprecatedVersions: ["v1"],
    sunsetByVersion: {
      v1: "2026-12-31",
    },
    successorByVersion: {
      v1: "v2",
    },
  };
}

export function resolveVersion(request: RequestContext, policy: VersionPolicy): ResolvedVersion {
  const versionFromPath = parseVersionFromPath(request.path);

  if (versionFromPath !== undefined) {
    assertSupportedVersion(versionFromPath, policy);
    return {
      version: versionFromPath,
      source: "path",
    };
  }

  const versionFromHeaders = parseVersionFromHeaders(request.headers);

  if (versionFromHeaders !== undefined) {
    assertSupportedVersion(versionFromHeaders, policy);
    return {
      version: versionFromHeaders,
      source: "header",
    };
  }

  return {
    version: policy.defaultVersion,
    source: "default",
  };
}

export function buildVersionHeaders(version: ApiVersion, policy: VersionPolicy): Record<string, string> {
  const headers: Record<string, string> = {
    "X-API-Version": version,
  };

  if (policy.deprecatedVersions.includes(version)) {
    headers.Deprecation = "true";
    const sunset = policy.sunsetByVersion[version];

    if (sunset !== undefined) {
      headers.Sunset = sunset;
    }

    const successor = policy.successorByVersion[version];

    if (successor !== undefined) {
      headers.Link = `</docs/api-migrations/${version}-to-${successor}>; rel="successor-version"`;
    }
  }

  return headers;
}

export class VersionUsageMetrics {
  private readonly routeCounters = new Map<string, number>();
  private readonly consumerCounters = new Map<string, number>();

  public record(version: ApiVersion, routeKey: string, consumerId: string = "anonymous"): void {
    this.increment(this.routeCounters, `${routeKey}:${version}`);
    this.increment(this.consumerCounters, `${consumerId}:${version}`);
  }

  public snapshot(): {
    readonly routeUsage: Readonly<Record<string, number>>;
    readonly consumerUsage: Readonly<Record<string, number>>;
  } {
    return {
      routeUsage: Object.fromEntries(this.routeCounters),
      consumerUsage: Object.fromEntries(this.consumerCounters),
    };
  }

  private increment(counter: Map<string, number>, key: string): void {
    counter.set(key, (counter.get(key) ?? 0) + 1);
  }
}

function parseVersionFromPath(path: string): ApiVersion | undefined {
  if (path.includes("/v1/")) {
    return "v1";
  }

  if (path.includes("/v2/")) {
    return "v2";
  }

  return undefined;
}

function parseVersionFromHeaders(
  headers: Readonly<Record<string, string | undefined>> | undefined,
): ApiVersion | undefined {
  if (headers === undefined) {
    return undefined;
  }

  const normalizedHeaders = Object.fromEntries(
    Object.entries(headers).map(([key, value]) => [key.toLowerCase(), value]),
  );

  for (const headerName of VERSION_HEADERS) {
    const rawValue = normalizedHeaders[headerName];

    if (rawValue === "1" || rawValue === "v1") {
      return "v1";
    }

    if (rawValue === "2" || rawValue === "v2") {
      return "v2";
    }
  }

  return undefined;
}

function assertSupportedVersion(version: ApiVersion, policy: VersionPolicy): void {
  if (!policy.supportedVersions.includes(version)) {
    throw new Error(`Unsupported API version: ${version}`);
  }
}
