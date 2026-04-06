import { createLogger } from "./shared/logger";

const logger = createLogger("output-encoding");

function escapeHtml(raw: string): string {
  return raw
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;")
    .replaceAll("'", "&#39;");
}

const userDisplayName = "<script>alert('xss')</script>";

logger.info("encoded_output", {
  rendered: escapeHtml(userDisplayName),
  note: "Output encoding must happen in the rendering context, not assumed from input validation.",
});
