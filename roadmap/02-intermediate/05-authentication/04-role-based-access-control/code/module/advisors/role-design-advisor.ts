export class RoleDesignAdvisor {
  public assess(input: {
    readonly roleCount: number;
    readonly exceptionDrivenRoles: number;
    readonly averagePermissionsPerRole: number;
  }): {
    readonly recommendation: string;
    readonly warnings: readonly string[];
  } {
    const warnings: string[] = [];

    if (input.roleCount >= 8) {
      warnings.push("The role catalog is growing large enough that role explosion risk should be reviewed.");
    }

    if (input.exceptionDrivenRoles >= 3) {
      warnings.push("Too many special-case roles may signal that the permission model needs redesign.");
    }

    if (input.averagePermissionsPerRole >= 5) {
      warnings.push("Large permission bundles can weaken least privilege and hide overgranting.");
    }

    return {
      recommendation:
        warnings.length === 0
          ? "The current role design still looks manageable and close to least privilege."
          : "Revisit the permission model before adding more roles or broadening existing ones.",
      warnings,
    };
  }
}
