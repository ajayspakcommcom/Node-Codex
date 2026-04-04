function buildRequestMetadata(): { path: string; method: string } {
  return {
    path: "/orders",
    method: "POST",
  };
}

function validateRequest(): void {
  console.log("2. validate request");
}

function persistRequest(): void {
  console.log("3. persist request");
}

function handleRequest(): void {
  console.log("1. enter handler");
  const metadata = buildRequestMetadata();
  validateRequest();
  persistRequest();
  console.log("4. response ready", metadata);
}

handleRequest();
