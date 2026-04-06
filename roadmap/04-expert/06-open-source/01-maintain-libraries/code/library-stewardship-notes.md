# Library Stewardship Notes

## Review Sequence

1. Classify the change as patch, minor, or breaking.
2. Require changelog and migration guidance when consumer impact exists.
3. Review deprecations before removals.
4. Validate contribution quality against compatibility and support rules.
5. Publish only when the release gate and support expectations are satisfied.

## Rules

- shared libraries need explicit release discipline and support scope
- breaking change review is a maintainer responsibility, not just a version bump
- deprecations should appear before removals with clear migration guidance
- contributions should be reviewed for long-term maintenance cost, not only correctness
