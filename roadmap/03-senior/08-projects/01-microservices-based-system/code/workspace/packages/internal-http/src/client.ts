export async function postJson<TRequest extends object, TResponse = void>(
  url: string,
  body: TRequest,
): Promise<TResponse> {
  return {
    url,
    body,
  } as unknown as TResponse;
}
