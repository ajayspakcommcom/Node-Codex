import { RedisUnavailableError } from "../clients/failing-redis-client.js";
import { TemporaryStateCache } from "../cache/temporary-state-cache.js";
import type { CacheMetrics } from "../../shared/cache-runtime.js";

export class VerificationCodeService {
  public constructor(
    private readonly temporaryStateCache: TemporaryStateCache,
    private readonly cacheMetrics: CacheMetrics,
  ) {}

  public async issueCode(tenantId: string, userId: string, code: string): Promise<void> {
    try {
      await this.temporaryStateCache.setVerificationCode(tenantId, userId, code);
    } catch (error) {
      if (!(error instanceof RedisUnavailableError)) {
        throw error;
      }

      this.cacheMetrics.recordFallback("verification-code-write-bypass");
    }
  }

  public async verifyCode(tenantId: string, userId: string, submittedCode: string): Promise<boolean> {
    try {
      const storedCode = await this.temporaryStateCache.getVerificationCode(tenantId, userId);

      if (storedCode === undefined) {
        this.cacheMetrics.recordMiss("verification-code");
        return false;
      }

      this.cacheMetrics.recordHit("verification-code");

      if (storedCode !== submittedCode) {
        return false;
      }

      await this.temporaryStateCache.clearVerificationCode(tenantId, userId);
      this.cacheMetrics.recordInvalidation("verification-code");
      return true;
    } catch (error) {
      if (!(error instanceof RedisUnavailableError)) {
        throw error;
      }

      this.cacheMetrics.recordFallback("verification-code-read-bypass");
      return false;
    }
  }
}
