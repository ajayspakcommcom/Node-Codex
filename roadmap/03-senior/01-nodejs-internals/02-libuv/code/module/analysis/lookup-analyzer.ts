import { lookupHost } from "../../shared/libuv-runtime.js";
import type { LookupResult } from "../../shared/libuv-types.js";

export class LookupAnalyzer {
  public async resolve(hosts: readonly string[]): Promise<readonly LookupResult[]> {
    return Promise.all(hosts.map((host) => lookupHost(host)));
  }
}
