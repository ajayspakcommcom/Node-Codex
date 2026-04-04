export interface RequestContext {
  method: string;
  path: string;
  headers: Record<string, string | undefined>;
  params: Record<string, string>;
  query: Record<string, string>;
  body: Record<string, unknown>;
  requestId?: string;
  auth?: {
    userId: string;
    role: "admin" | "user";
  };
  locals: Record<string, unknown>;
}

export interface ResponseContext {
  statusCode: number;
  headers: Record<string, string>;
  body?: unknown;
  finished: boolean;
}

export class MiddlewareError extends Error {
  public constructor(
    public readonly statusCode: number,
    public readonly code: string,
    message: string,
  ) {
    super(message);
    this.name = "MiddlewareError";
  }
}

export type NextFunction = () => Promise<void>;
export type Middleware = (request: RequestContext, response: ResponseContext, next: NextFunction) => Promise<void>;

export function createRequestContext(overrides?: Partial<RequestContext>): RequestContext {
  return {
    method: overrides?.method ?? "GET",
    path: overrides?.path ?? "/example",
    headers: overrides?.headers ?? {},
    params: overrides?.params ?? {},
    query: overrides?.query ?? {},
    body: overrides?.body ?? {},
    requestId: overrides?.requestId,
    auth: overrides?.auth,
    locals: overrides?.locals ?? {},
  };
}

export function createResponseContext(): ResponseContext {
  return {
    statusCode: 200,
    headers: {},
    body: undefined,
    finished: false,
  };
}

export async function runMiddlewareStack(
  middlewares: readonly Middleware[],
  request: RequestContext,
): Promise<ResponseContext> {
  const response = createResponseContext();

  const dispatch = async (index: number): Promise<void> => {
    const middleware = middlewares[index];

    if (!middleware || response.finished) {
      return;
    }

    await middleware(request, response, async () => {
      await dispatch(index + 1);
    });
  };

  await dispatch(0);
  return response;
}
