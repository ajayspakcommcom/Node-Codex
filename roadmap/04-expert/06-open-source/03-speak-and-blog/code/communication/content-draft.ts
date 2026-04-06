export interface ContentDraft {
  title: string;
  audience: string;
  sections: readonly string[];
  hasMetrics: boolean;
  hasConcreteExample: boolean;
  hasOperationalLesson: boolean;
  containsCustomerNames: boolean;
  containsInternalSystemNames: boolean;
  hasBeenGeneralized: boolean;
}

export function createDefaultContentDraft(): ContentDraft {
  return {
    title: "How We Reduced Tail Latency in a Multi-Service Node.js API",
    audience: "backend engineers operating high-traffic services",
    sections: ["Problem", "Critical path", "Measurements", "Changes", "Lessons"],
    hasMetrics: true,
    hasConcreteExample: true,
    hasOperationalLesson: true,
    containsCustomerNames: false,
    containsInternalSystemNames: true,
    hasBeenGeneralized: true,
  };
}
