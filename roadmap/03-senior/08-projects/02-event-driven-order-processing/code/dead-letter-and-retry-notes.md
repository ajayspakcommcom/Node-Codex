# Dead-Letter And Retry Notes

- retry only transient failures such as dependency timeouts or queue transport issues
- move poison messages to a dead-letter queue after bounded retry attempts
- record failure reason and event metadata for investigation
- keep consumers idempotent so safe replay remains possible
