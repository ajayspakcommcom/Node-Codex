export interface BudgetEvaluationInput {
  serviceName: string;
  monthlyCostUsd: number;
}

export interface BudgetEvaluationResult {
  withinBudget: boolean;
  budgetUsd: number;
}

export class BudgetPolicy {
  public constructor(private readonly monthlyBudgets: ReadonlyMap<string, number>) {}

  public evaluate(input: BudgetEvaluationInput): BudgetEvaluationResult {
    const budgetUsd = this.monthlyBudgets.get(input.serviceName);

    if (budgetUsd === undefined) {
      throw new Error(`No budget defined for ${input.serviceName}`);
    }

    return {
      withinBudget: input.monthlyCostUsd <= budgetUsd,
      budgetUsd,
    };
  }
}

export function createDefaultBudgetPolicy(): BudgetPolicy {
  return new BudgetPolicy(
    new Map<string, number>([
      ["catalog-api", 8500],
      ["analytics-batch", 15000],
    ]),
  );
}
