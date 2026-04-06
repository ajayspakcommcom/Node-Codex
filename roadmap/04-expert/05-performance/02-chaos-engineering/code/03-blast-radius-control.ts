import { reviewBlastRadius } from "./chaos/blast-radius.js";

console.log(
  reviewBlastRadius({
    affectedServices: 1,
    maximumAllowedServices: 2,
  }),
);
