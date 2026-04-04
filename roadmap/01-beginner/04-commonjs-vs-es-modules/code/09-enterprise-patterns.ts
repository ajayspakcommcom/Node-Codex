interface ModulePolicy {
  readonly runtimeStyle: "commonjs" | "esm";
  readonly exportStyle: "named" | "default";
  readonly publicEntryPoint: string;
}

function buildModulePolicy(
  runtimeStyle: ModulePolicy["runtimeStyle"],
  publicEntryPoint = "./index.js",
): ModulePolicy {
  return {
    runtimeStyle,
    exportStyle: "named",
    publicEntryPoint,
  };
}

console.log("Enterprise module policy:", buildModulePolicy("esm"));
