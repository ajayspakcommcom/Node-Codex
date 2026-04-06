console.log(
  JSON.stringify({
    controls: [
      { control: "alert ownership registry", owner: "platform-team" },
      { control: "runbook policy", owner: "incident-management-team" },
      { control: "quarterly alert review", owner: "service-teams" },
    ],
    note: "Enterprise alerting stays maintainable when ownership, runbooks, and review cadence are explicit.",
  }),
);
