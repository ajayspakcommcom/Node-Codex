export async function getJson<T>(url: string): Promise<T> {
  if (url.includes("/internal/feed")) {
    return Promise.resolve({
      items: [
        {
          sku: "sku_traffic_1",
          title: "Noise Cancelling Headphones",
          priceInCents: 14999,
          available: true,
        },
        {
          sku: "sku_traffic_2",
          title: "Mechanical Keyboard",
          priceInCents: 8999,
          available: true,
        },
      ],
      metadata: {
        region: "in",
        category: "electronics",
        page: 1,
        pageSize: 20,
        cacheStatus: "miss",
      },
    } as T);
  }

  return Promise.resolve({ url } as T);
}

export async function postJson<TRequest, TResponse>(
  url: string,
  body: TRequest,
): Promise<TResponse> {
  return Promise.resolve({
    accepted: true,
    url,
    body,
  } as TResponse);
}
