# Contract Review Checklist

- Is this change backward compatible for existing consumers?
- Are request and response shapes explicitly documented?
- Are error semantics and status codes stable and intentional?
- Does the change affect pagination, filtering, sorting, or idempotency behavior?
- Are new fields additive, optional, and safe for older consumers?
- Has downstream consumer impact been identified and communicated?
- Is versioning or deprecation required for this change?
- Are contract tests or validation notes updated?

