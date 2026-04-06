import { createService } from "@platform/framework-core/create-service";
import { type FrameworkPlugin } from "@platform/framework-core/types";

const catalogAuditPlugin: FrameworkPlugin = {
  name: "catalog-audit-plugin",
  apply(context) {
    context.registerHook("beforeStart", async () => {
      context.logger.info("catalog_audit_plugin_ready", {
        team: "catalog",
      });
    });
  },
};

const catalogApi = createService({
  serviceName: "catalog-api",
  configSchema: {
    NODE_ENV: { required: true },
    PORT: { required: true, parse: Number },
    CATALOG_DATABASE_URL: { required: true },
  },
  plugins: [catalogAuditPlugin],
  registerRoutes(context) {
    context.route("GET", "/catalog/items", async () => ({
      status: 200,
      body: {
        items: [
          { sku: "sku_401", title: "Mechanical Keyboard" },
          { sku: "sku_402", title: "27 inch Monitor" },
        ],
      },
    }));
  },
});

void catalogApi.start({
  NODE_ENV: "production",
  PORT: "4300",
  CATALOG_DATABASE_URL: "postgres://catalog.internal/catalog",
});
