console.log(
  JSON.stringify({
    controls: [
      { control: "shared metrics registry", owner: "platform-team" },
      { control: "label review policy", owner: "observability-team" },
      { control: "dashboard ownership", owner: "service-team" },
    ],
    note: "Enterprise metrics stay maintainable when naming, labels, and dashboards are standardized and owned.",
  }),
);
