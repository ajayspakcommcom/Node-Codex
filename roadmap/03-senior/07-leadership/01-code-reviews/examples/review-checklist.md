# Review Checklist

- Does the change introduce behavioral regressions or edge-case bugs?
- Does the change respect existing API and data contracts?
- Is error handling sufficient for production behavior?
- Are security boundaries, auth, and validation still correct?
- Are observability hooks present where they need to be?
- Are tests covering the changed behavior and important failure paths?
- Is the code understandable and maintainable for the next engineer?
- Are rollback or migration concerns obvious if the change is high risk?

