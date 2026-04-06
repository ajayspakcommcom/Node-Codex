# Context Map

- `orders` context owns order placement, item invariants, and order lifecycle language
- `billing` context is treated as a foreign model from the perspective of orders
- `orders` does not speak the legacy billing contract directly
- `billing` anti-corruption layer translates from order-payment intent to the legacy billing command model

## Boundary Rules

- aggregates enforce domain invariants before infrastructure calls
- application services coordinate repositories and external integrations
- repositories return domain models, not transport objects
- foreign models stay behind adapters so the domain language remains stable
