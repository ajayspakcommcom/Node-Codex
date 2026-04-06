import { createLogger } from "@platform/observability/logger";
import { validateConfig } from "./config.js";
import { createDefaultPlugins } from "./default-plugins.js";
import {
  type FrameworkContext,
  type FrameworkPlugin,
  type RouteDefinition,
  type ServiceDefinition,
} from "./types.js";

function createFrameworkContext(
  serviceName: string,
  config: Record<string, unknown>,
  routes: RouteDefinition[],
  hooks: Record<"beforeStart" | "afterStart", Array<() => Promise<void>>>,
): FrameworkContext {
  const logger = createLogger(serviceName);

  return {
    serviceName,
    config,
    logger,
    route(method, path, handler) {
      routes.push({
        method,
        path,
        handler,
      });
    },
    registerHook(name, handler) {
      hooks[name].push(handler);
    },
  };
}

async function runHooks(hooks: Array<() => Promise<void>>): Promise<void> {
  for (const hook of hooks) {
    await hook();
  }
}

export function createService(definition: ServiceDefinition) {
  return {
    async start(environment: Record<string, string | undefined> = process.env): Promise<void> {
      const config = validateConfig(definition.configSchema, environment);
      const routes: RouteDefinition[] = [];
      const hooks = {
        beforeStart: [] as Array<() => Promise<void>>,
        afterStart: [] as Array<() => Promise<void>>,
      };

      const context = createFrameworkContext(definition.serviceName, config, routes, hooks);
      const plugins: FrameworkPlugin[] = [
        ...createDefaultPlugins(),
        ...(definition.plugins ?? []),
      ];

      for (const plugin of plugins) {
        plugin.apply(context);
      }

      definition.registerRoutes(context);

      await runHooks(hooks.beforeStart);
      context.logger.info("framework_bootstrap_completed", {
        serviceName: definition.serviceName,
        routeCount: routes.length,
        pluginCount: plugins.length,
      });
      await runHooks(hooks.afterStart);

      for (const route of routes) {
        const response = await route.handler();
        context.logger.info("framework_route_registered", {
          method: route.method,
          path: route.path,
          exampleStatus: response.status,
        });
      }
    },
  };
}
