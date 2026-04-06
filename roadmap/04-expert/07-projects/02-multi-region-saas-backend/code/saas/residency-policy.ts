import type { Jurisdiction } from "./tenant-placement.js";

const approvedRegionsByJurisdiction: Record<Jurisdiction, string[]> = {
  us: ["us-east-1", "us-west-2"],
  eu: ["eu-west-1", "eu-central-1"],
  apac: ["ap-southeast-1", "ap-northeast-1"],
};

export function validateResidency(jurisdiction: Jurisdiction, regions: string[]): boolean {
  const approved = new Set(approvedRegionsByJurisdiction[jurisdiction]);
  return regions.every((region) => approved.has(region));
}
