import type { ComposeSpec } from "../../shared/compose-types.js";

export class EnvironmentCoordinationAdvisor {
  public compare(spec: ComposeSpec): {
    readonly duplicatedKeys: readonly string[];
    readonly sensitiveKeysInCompose: readonly string[];
  } {
    const keyCounts = new Map<string, number>();
    const sensitiveKeys: string[] = [];

    for (const service of spec.services) {
      for (const [key, value] of Object.entries(service.environment ?? {})) {
        keyCounts.set(key, (keyCounts.get(key) ?? 0) + 1);

        if (/(SECRET|PASSWORD|TOKEN)/.test(key) || /secret|password|token/i.test(value)) {
          sensitiveKeys.push(`${service.name}.${key}`);
        }
      }
    }

    return {
      duplicatedKeys: [...keyCounts.entries()]
        .filter(([, count]) => count > 1)
        .map(([key]) => key),
      sensitiveKeysInCompose: sensitiveKeys,
    };
  }
}
