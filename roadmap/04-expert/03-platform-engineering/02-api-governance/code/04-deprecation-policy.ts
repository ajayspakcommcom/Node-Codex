import { validateDeprecationWindow } from "./governance/deprecation-policy.js";

console.log(
  validateDeprecationWindow({
    announcedOn: "2026-04-01",
    removalOn: "2026-07-15",
    minimumDays: 60,
  }),
);
