import { InMemoryTransactionManager } from "../db/in-memory-transaction-manager.js";
import { AccountRepository } from "../repositories/account-repository.js";
import type { IsolationLevel, TransactionResult } from "../../shared/transaction-types.js";

export interface FundTransferCommand {
  readonly fromAccountId: string;
  readonly toAccountId: string;
  readonly amountInCents: number;
  readonly isolationLevel?: IsolationLevel;
}

export class FundTransferService {
  public constructor(
    private readonly transactionManager: InMemoryTransactionManager,
    private readonly accountRepository: AccountRepository,
  ) {}

  public transfer(command: FundTransferCommand): TransactionResult<{
    readonly fromAccountBalanceInCents: number;
    readonly toAccountBalanceInCents: number;
  }> {
    return this.transactionManager.runInTransaction(
      {
        name: "fund-transfer",
        isolationLevel: command.isolationLevel ?? "read-committed",
      },
      (transaction) => {
        const debitedAccount = this.accountRepository.debit(
          transaction,
          command.fromAccountId,
          command.amountInCents,
        );
        const creditedAccount = this.accountRepository.credit(
          transaction,
          command.toAccountId,
          command.amountInCents,
        );

        return {
          fromAccountBalanceInCents: debitedAccount.balanceInCents,
          toAccountBalanceInCents: creditedAccount.balanceInCents,
        };
      },
    );
  }
}
