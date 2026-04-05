import { logger } from "./shared/logger.js";

const storageChoices = [
  {
    option: "HttpOnly secure cookie",
    strengths: [
      "Reduces direct JavaScript access to the token.",
      "Fits browser session handling patterns well when CSRF controls are also considered.",
    ],
    risks: ["Still requires sound cookie configuration and CSRF strategy."],
  },
  {
    option: "Browser localStorage",
    strengths: ["Simple for front-end code to read."],
    risks: [
      "Makes token theft easier if the page is compromised by XSS.",
      "Often chosen for convenience instead of risk-based design.",
    ],
  },
  {
    option: "Authorization header from a trusted backend client",
    strengths: ["Common and explicit for server-to-server requests."],
    risks: ["Still requires transport security and careful logging discipline."],
  },
];

logger.warn("Storage and transport risk", {
  storageChoices,
  guidance: "JWT security depends not only on token format but also on where the token lives and how it is transported between parties.",
});
