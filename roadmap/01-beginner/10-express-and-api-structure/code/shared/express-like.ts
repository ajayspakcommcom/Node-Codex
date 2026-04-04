export interface RequestLike<TBody = unknown> {
  readonly params: Readonly<Record<string, string>>;
  readonly query: Readonly<Record<string, string | undefined>>;
  readonly headers: Readonly<Record<string, string | undefined>>;
  readonly body?: TBody;
  readonly context?: {
    readonly requestId?: string;
    readonly actorId?: string;
  };
}

export interface ResponseLike<TBody = unknown> {
  readonly statusCode: number;
  readonly body: TBody;
}

export type NextFunction = (error?: unknown) => void;

export type Middleware<TBody = unknown> = (
  request: RequestLike<TBody>,
  next: NextFunction,
) => void;

export type Handler<TBody = unknown, TResponse = unknown> = (
  request: RequestLike<TBody>,
) => Promise<ResponseLike<TResponse>> | ResponseLike<TResponse>;
