export interface AdoptionSnapshot {
  totalServices: number;
  pavedRoadServices: number;
}

export function calculateAdoptionRate(snapshot: AdoptionSnapshot): number {
  if (snapshot.totalServices === 0) {
    return 0;
  }

  return snapshot.pavedRoadServices / snapshot.totalServices;
}
