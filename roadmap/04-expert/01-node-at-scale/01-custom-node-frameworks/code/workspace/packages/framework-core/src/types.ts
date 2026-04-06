import { type Logger } from "@platform/observability/logger";

export interface RouteResult {
  readonly status: number;
  readonly body: unknown;
}

export interface RouteDefinition {
  readonly method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  readonly path: string;
  readonly handler: () => Promise<RouteResult>;
}

export interface FrameworkContext {
  readonly serviceName: string;
  readonly config: Record<string, unknown>;
  readonly logger: Logger;
  route(method: RouteDefinition["method"], path: string, handler: RouteDefinition["handler"]): void;
  registerHook(name: "beforeStart" | "afterStart", handler: () => Promise<void>): void;
}

export interface FrameworkPlugin {
  readonly name: string;
  apply(context: FrameworkContext): void;
}

export interface ConfigFieldDefinition {
  readonly required: boolean;
  readonly parse?: (value: string) => unknown;
}

export interface ServiceDefinition {
  readonly serviceName: string;
  readonly configSchema: Record<string, ConfigFieldDefinition>;
  readonly plugins?: readonly FrameworkPlugin[];
  registerRoutes(context: FrameworkContext): void;
}
