import { logger } from "./shared/logger.js";

const storageChoices = [
  {
    option: "HttpOnly secure cookie",
    strengths: [
      "Reduces JavaScript access to the refresh token.",
      "Fits browser session flows well when CSRF is also addressed.",
    ],
    risks: ["Still needs careful cookie configuration and session invalidation behavior."],
  },
  {
    option: "Browser localStorage",
    strengths: ["Simple for front-end code to read."],
    risks: [
      "High-value long-lived credential is easier to steal in XSS scenarios.",
      "Convenience can hide the sensitivity of refresh tokens.",
    ],
  },
  {
    option: "Encrypted server-managed session store",
    strengths: [
      "Allows stronger server-side control and easier revocation handling.",
    ],
    risks: ["Adds more infrastructure and lifecycle complexity."],
  },
];

logger.warn("Storage and transport risk", {
  storageChoices,
  guidance: "Refresh tokens are often more sensitive than short-lived access tokens because they can mint new access, so storage choices should reflect that higher risk.",
});
