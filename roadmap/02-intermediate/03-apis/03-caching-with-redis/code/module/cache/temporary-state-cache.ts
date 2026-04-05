import type { CacheClient } from "../../shared/cache-types.js";
import { buildCacheKey } from "../../shared/cache-runtime.js";

export interface TemporaryStateCacheConfig {
  readonly keyPrefix: string;
  readonly verificationCodeTtlMs: number;
}

export class TemporaryStateCache {
  public constructor(
    private readonly cacheClient: CacheClient,
    private readonly config: TemporaryStateCacheConfig,
  ) {}

  public async setVerificationCode(tenantId: string, userId: string, code: string): Promise<void> {
    await this.cacheClient.set(
      this.buildVerificationCodeKey(tenantId, userId),
      code,
      this.config.verificationCodeTtlMs,
    );
  }

  public async getVerificationCode(tenantId: string, userId: string): Promise<string | undefined> {
    return this.cacheClient.get(this.buildVerificationCodeKey(tenantId, userId));
  }

  public async clearVerificationCode(tenantId: string, userId: string): Promise<void> {
    await this.cacheClient.delete(this.buildVerificationCodeKey(tenantId, userId));
  }

  private buildVerificationCodeKey(tenantId: string, userId: string): string {
    return buildCacheKey(this.config.keyPrefix, "verification-code", tenantId, userId);
  }
}
