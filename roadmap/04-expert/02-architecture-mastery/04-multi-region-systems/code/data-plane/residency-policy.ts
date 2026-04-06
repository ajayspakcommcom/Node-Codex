const residencyMap: Record<"apac" | "eu" | "global", readonly string[]> = {
  apac: ["ap-south-1", "ap-southeast-1"],
  eu: ["eu-west-1", "eu-central-1"],
  global: ["ap-south-1", "eu-west-1", "us-east-1"],
};

export class ResidencyPolicy {
  isRegionAllowed(residency: "apac" | "eu" | "global", region: string): boolean {
    return residencyMap[residency].includes(region);
  }
}
