export interface ApiStyleGuide {
  requiredCapabilities(): readonly string[];
}

class DefaultApiStyleGuide implements ApiStyleGuide {
  public requiredCapabilities(): readonly string[] {
    return ["auth-scheme", "error-envelope", "pagination-contract", "request-id-correlation"];
  }
}

export function createDefaultStyleGuide(): ApiStyleGuide {
  return new DefaultApiStyleGuide();
}
