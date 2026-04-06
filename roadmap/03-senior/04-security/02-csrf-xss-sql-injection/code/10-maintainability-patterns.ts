import { createLogger } from "./shared/logger";

const logger = createLogger("maintainability");

interface SecurityBoundary {
  readonly control: string;
  readonly owner: string;
}

const boundaries: readonly SecurityBoundary[] = [
  { control: "csrf-middleware", owner: "platform-team" },
  { control: "html-encoding-helper", owner: "frontend-platform" },
  { control: "query-builder-boundary", owner: "data-platform" },
];

logger.info("shared_security_boundaries", {
  boundaries,
  note: "Enterprise security stays maintainable when boundary controls are standardized instead of copied ad hoc.",
});
