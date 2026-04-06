# Feedback Examples

- `Strong:` This implementation works, but the retry logic currently hides all failure types together. Can you separate transient dependency errors from validation failures so the behavior is safer in production?
- `Strong:` Your controller is doing auth parsing and business validation together. Try moving the business rule into the service so the transport boundary stays clearer.
- `Weak:` This is not clean.`
- `Weak:` Change this.`

