import { loadInternalUserRecord } from "./internal-user-record.js";

export interface UserSummary {
  readonly id: string;
  readonly email: string;
  readonly status: "active" | "disabled";
}

export function loadUserSummary(userId: string): UserSummary {
  const record = loadInternalUserRecord(userId);

  return {
    id: record.id,
    email: record.email,
    status: record.status,
  };
}
