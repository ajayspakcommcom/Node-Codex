import type { ProductRecord } from "./api-cache-types.js";

export const cacheRuntime = {
  defaultNowEpochSeconds: 1_775_338_800,
  productTtlSeconds: 180,
  catalogTtlSeconds: 120,
} as const;

export const seedProducts: readonly ProductRecord[] = [
  {
    id: "prod_alpha_1",
    tenantId: "tenant_alpha",
    sku: "ALPHA-RED-TS",
    name: "Red Team Shirt",
    category: "apparel",
    priceInCents: 2500,
    updatedAtEpochSeconds: 1_775_338_100,
  },
  {
    id: "prod_alpha_2",
    tenantId: "tenant_alpha",
    sku: "ALPHA-CUP-01",
    name: "Ceramic Team Mug",
    category: "merch",
    priceInCents: 1800,
    updatedAtEpochSeconds: 1_775_338_200,
  },
  {
    id: "prod_beta_1",
    tenantId: "tenant_beta",
    sku: "BETA-HOOD-01",
    name: "Beta Hoodie",
    category: "apparel",
    priceInCents: 4200,
    updatedAtEpochSeconds: 1_775_338_250,
  },
] as const;

export function cloneSeedProducts(): ProductRecord[] {
  return seedProducts.map((product) => ({ ...product }));
}
