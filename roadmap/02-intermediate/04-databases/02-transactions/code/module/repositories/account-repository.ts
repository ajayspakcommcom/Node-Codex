import { TransactionContext } from "../db/in-memory-transaction-manager.js";
import type { Account } from "../../shared/transaction-types.js";

export class AccountRepository {
  public findRequired(transaction: TransactionContext, accountId: string): Account {
    const account = transaction.readAccount(accountId);

    if (account === undefined) {
      throw new Error(`Account ${accountId} was not found.`);
    }

    return account;
  }

  public debit(transaction: TransactionContext, accountId: string, amountInCents: number): Account {
    const account = this.findRequired(transaction, accountId);

    if (account.balanceInCents < amountInCents) {
      throw new Error(`Account ${accountId} does not have enough balance.`);
    }

    const updatedAccount: Account = {
      ...account,
      balanceInCents: account.balanceInCents - amountInCents,
    };

    transaction.writeAccount(updatedAccount);
    return updatedAccount;
  }

  public credit(transaction: TransactionContext, accountId: string, amountInCents: number): Account {
    const account = this.findRequired(transaction, accountId);

    const updatedAccount: Account = {
      ...account,
      balanceInCents: account.balanceInCents + amountInCents,
    };

    transaction.writeAccount(updatedAccount);
    return updatedAccount;
  }
}
