export interface TrafficSlice {
  endpoint: string;
  percentage: number;
  method: "GET" | "POST";
}

export interface TrafficProfile {
  serviceName: string;
  slices: readonly TrafficSlice[];
}

export function createDefaultTrafficProfile(): TrafficProfile {
  return {
    serviceName: "catalog-api",
    slices: [
      {
        endpoint: "/products",
        percentage: 70,
        method: "GET",
      },
      {
        endpoint: "/search",
        percentage: 20,
        method: "GET",
      },
      {
        endpoint: "/checkout",
        percentage: 10,
        method: "POST",
      },
    ],
  };
}
