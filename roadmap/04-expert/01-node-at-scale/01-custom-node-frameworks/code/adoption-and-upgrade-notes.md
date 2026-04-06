# Adoption And Upgrade Notes

## Framework Boundaries

- framework owns bootstrap, health conventions, request-id behavior, and startup logging
- adopting services own domain routes, domain validation, and dependency wiring
- product teams should not patch framework internals from service repos

## Upgrade Strategy

- treat framework releases as compatibility-sensitive platform changes
- publish release notes for new defaults, deprecated hooks, and breaking behavior
- allow service teams to test framework upgrades in a staging lane before rollout
- keep override points explicit so teams do not fork the framework to adopt it

## Governance Rules

- every new default behavior needs platform review
- every extension point should have ownership and support expectations
- framework abstractions must reduce service boilerplate without hiding critical operational behavior
