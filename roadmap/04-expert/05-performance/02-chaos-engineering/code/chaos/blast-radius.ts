export interface BlastRadiusInput {
  affectedServices: number;
  maximumAllowedServices: number;
}

export function reviewBlastRadius(input: BlastRadiusInput): boolean {
  return input.affectedServices <= input.maximumAllowedServices;
}
