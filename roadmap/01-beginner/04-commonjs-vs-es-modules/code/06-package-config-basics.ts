interface PackageConfigShape {
  readonly name: string;
  readonly private: boolean;
  readonly type?: "module";
  readonly main: string;
}

const commonjsConfig: PackageConfigShape = {
  name: "commonjs-example",
  private: true,
  main: "./index.cjs",
};

const esmConfig: PackageConfigShape = {
  name: "esm-example",
  private: true,
  type: "module",
  main: "./index.js",
};

console.log("CommonJS package basics:", commonjsConfig);
console.log("ESM package basics:", esmConfig);
