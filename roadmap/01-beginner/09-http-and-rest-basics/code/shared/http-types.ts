export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface HttpRequest<TBody = unknown> {
  readonly method: HttpMethod;
  readonly path: string;
  readonly params: Readonly<Record<string, string>>;
  readonly query: Readonly<Record<string, string | undefined>>;
  readonly headers: Readonly<Record<string, string | undefined>>;
  readonly cookies: Readonly<Record<string, string | undefined>>;
  readonly body?: TBody;
}

export interface HttpResponse<TBody = unknown> {
  readonly statusCode: number;
  readonly headers?: Readonly<Record<string, string>>;
  readonly body: TBody;
}

export interface ApiErrorBody {
  readonly error: {
    readonly code: string;
    readonly message: string;
  };
}

export interface ApiSuccessBody<TData> {
  readonly data: TData;
  readonly meta?: Readonly<Record<string, unknown>>;
}
