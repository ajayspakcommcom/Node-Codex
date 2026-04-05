import type { AwsWorkload } from "./aws-service-types.js";

export const billingApiWorkload: AwsWorkload = {
  name: "billing-api",
  hasUploads: true,
  relationalQueries: true,
  needsServerControl: true,
  trafficShape: "steady",
};

export const reportingApiWorkload: AwsWorkload = {
  name: "reporting-api",
  hasUploads: false,
  relationalQueries: true,
  needsServerControl: false,
  trafficShape: "steady",
};

export const riskyLegacyWorkload: AwsWorkload = {
  name: "legacy-monolith",
  hasUploads: true,
  relationalQueries: true,
  needsServerControl: true,
  trafficShape: "steady",
  storesUserAssetsOnDisk: true,
};
