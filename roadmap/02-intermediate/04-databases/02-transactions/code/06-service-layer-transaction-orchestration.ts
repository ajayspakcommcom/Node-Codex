import { InMemoryTransactionManager } from "./module/db/in-memory-transaction-manager.js";
import { AccountRepository } from "./module/repositories/account-repository.js";
import { FundTransferService } from "./module/services/fund-transfer-service.js";
import { createSeedState } from "./shared/transaction-runtime.js";
import { logger } from "./shared/logger.js";

const transactionManager = new InMemoryTransactionManager(createSeedState());
const fundTransferService = new FundTransferService(transactionManager, new AccountRepository());

const result = fundTransferService.transfer({
  fromAccountId: "acct_ops_reserve",
  toAccountId: "acct_seller_settlement",
  amountInCents: 75_000,
  isolationLevel: "read-committed",
});

logger.info("Service-layer transaction orchestration", {
  metrics: result.metrics,
  balancesAfterTransfer: result.value,
  snapshot: transactionManager.snapshot().accounts,
  guidance: "The service layer is where the business workflow can see the full invariant and coordinate repository work inside one transaction.",
});
