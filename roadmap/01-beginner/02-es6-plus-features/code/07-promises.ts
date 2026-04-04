function fetchAuditEvents(service: string): Promise<readonly string[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([`${service}:created`, `${service}:processed`]);
    }, 25);
  });
}

fetchAuditEvents("billing")
  .then((events) => {
    console.log("Events:", events);
  })
  .catch((error: unknown) => {
    if (error instanceof Error) {
      console.error(error.message);
    }
  });
