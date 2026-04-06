# Consumer Impact Notes

- internal mobile client parses `status` as a strict enum
- reporting pipeline depends on `createdAt` being present in every successful response
- partner integration retries based on current `409` conflict semantics
- changing any of the above requires coordinated communication and rollout planning

