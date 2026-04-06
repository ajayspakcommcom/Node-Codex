export interface RfcStatus {
  state: "draft" | "approved" | "implemented";
  implementationLinked: boolean;
}

export function createDefaultRfcStatus(): RfcStatus {
  return {
    state: "approved",
    implementationLinked: true,
  };
}
