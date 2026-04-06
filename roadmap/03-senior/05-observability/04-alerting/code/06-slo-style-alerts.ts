console.log(
  JSON.stringify({
    alertName: "search_api_error_budget_burn",
    sli: "successful request ratio",
    slo: "99.9% over 30d",
    shortWindowBurn: "14x over 5m",
    longWindowBurn: "6x over 1h",
  }),
);
