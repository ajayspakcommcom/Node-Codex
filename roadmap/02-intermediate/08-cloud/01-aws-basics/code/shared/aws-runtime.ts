import type { ResponsibilityBoundary, WorkloadProfile } from "./aws-types.js";

export const billingApiWorkload: WorkloadProfile = {
  name: "billing-api",
  hasFileUploads: true,
  needsRelationalData: true,
  needsServerControl: true,
  expectedTraffic: "steady",
  complianceSensitivity: "high",
  globalUsers: false,
};

export const publicMediaWorkload: WorkloadProfile = {
  name: "media-service",
  hasFileUploads: true,
  needsRelationalData: false,
  needsServerControl: false,
  expectedTraffic: "bursty",
  complianceSensitivity: "medium",
  globalUsers: true,
};

export const sharedResponsibilityExample: ResponsibilityBoundary = {
  awsManaged: [
    "physical infrastructure",
    "managed service host operations",
    "data center and hardware layer",
  ],
  teamOwned: [
    "application code security",
    "IAM policy design",
    "runtime configuration",
    "data handling and access control",
  ],
};
