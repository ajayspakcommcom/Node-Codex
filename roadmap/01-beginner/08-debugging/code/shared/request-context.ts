export interface RequestContext {
  readonly requestId: string;
  readonly route: string;
  readonly actorId?: string;
}

export function buildRequestContext(requestId: string, route: string, actorId?: string): RequestContext {
  return {
    requestId,
    route,
    actorId,
  };
}
