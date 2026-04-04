const dependencyRules = [
  "Controller -> Service",
  "Service -> Repository",
  "Repository -> Infrastructure",
  "Service should not depend directly on HTTP request objects",
  "Repository should not depend on controller concerns",
];

for (const rule of dependencyRules) {
  console.log(rule);
}
