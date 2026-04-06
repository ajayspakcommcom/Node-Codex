import { type FrameworkPlugin } from "./types.js";

export function createDefaultPlugins(): FrameworkPlugin[] {
  return [
    {
      name: "request-id-plugin",
      apply(context) {
        context.registerHook("beforeStart", async () => {
          context.logger.info("framework_request_id_policy_enabled", {
            serviceName: context.serviceName,
          });
        });
      },
    },
    {
      name: "health-plugin",
      apply(context) {
        context.route("GET", "/health", async () => ({
          status: 200,
          body: {
            service: context.serviceName,
            status: "ok",
          },
        }));
      },
    },
    {
      name: "startup-telemetry-plugin",
      apply(context) {
        context.registerHook("afterStart", async () => {
          context.logger.info("framework_service_started", {
            routeCount: "tracked_by_runtime",
          });
        });
      },
    },
  ];
}
