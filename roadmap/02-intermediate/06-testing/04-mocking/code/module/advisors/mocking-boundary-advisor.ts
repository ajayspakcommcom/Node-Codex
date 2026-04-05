export class MockingBoundaryAdvisor {
  public recommendBoundary(example: "payment_gateway" | "repository" | "core_logic"): string {
    if (example === "payment_gateway") {
      return "Mock or stub the external payment boundary because it is slow, unstable, and outside the unit under test.";
    }

    if (example === "repository") {
      return "Prefer a simple fake for repository behavior when you need realistic state changes without infrastructure setup.";
    }

    return "Do not mock the core business logic that the test is supposed to validate.";
  }
}
