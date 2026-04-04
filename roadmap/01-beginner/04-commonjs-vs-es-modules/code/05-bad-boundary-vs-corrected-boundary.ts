import { loadInternalUserRecord } from "./shared/boundaries/internal-user-record.js";
import { loadUserSummary } from "./shared/boundaries/public-user-api.js";

const badBoundaryUsage = loadInternalUserRecord("usr_400");
const correctedBoundaryUsage = loadUserSummary("usr_400");

console.log("Bad boundary usage exposes internals:", {
  id: badBoundaryUsage.id,
  leakedPasswordHash: badBoundaryUsage.passwordHash,
  leakedLastLoginIp: badBoundaryUsage.lastLoginIp,
});

console.log("Corrected boundary usage exposes public summary only:", correctedBoundaryUsage);
