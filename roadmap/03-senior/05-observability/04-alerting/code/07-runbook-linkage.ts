console.log(
  JSON.stringify({
    alertName: "identity_provider_timeout_rate",
    dashboardUrl: "https://observability.example/dashboards/auth",
    runbookUrl: "https://internal.example/runbooks/auth-idp-timeouts",
    note: "Alerts should carry responder context, not just a metric name.",
  }),
);
