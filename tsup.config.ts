import { defineConfig, type Options } from "tsup";

const baseOptions: Options = {
  clean: true,
  format: "esm",
  //bundle: true,
  dts: true,
  outDir: "esm/",
  tsconfig: "./tsconfig.json",
  skipNodeModulesBundle: false,
  external: ["react", "react-dom", "@tanstack/react-query", "zod"],
  //esbuildOptions(options, _ctx) {
  //  options.outbase = "./";
  //},
};

const mainConfig: Options = {
  ...baseOptions,
  clean: true,
  name: " INDEX/CORE BUNDLE".padEnd(20),
  entry: {
    index: "src/index.ts",
    core: "src/core.ts",
  },
};

const typesConfig: Options = {
  ...baseOptions,
  name: " TYPES BUNDLE".padEnd(20),
  entry: {
    "types/index": "src/types/index.ts",
    "types/models/errors/index": "src/models/errors/index.ts",
    "types/models/components/index": "src/models/components/index.ts",
    "types/models/operations/index": "src/models/operations/index.ts",
  },
};

const libConfig: Options = {
  ...baseOptions,
  name: " LIB BUNDLE".padEnd(20),
  outDir: "esm/lib",
  entry: ["src/lib/*.ts"],
};

const funcsConfig: Options = {
  ...baseOptions,
  name: " FUNCS BUNDLE".padEnd(20),
  outDir: "esm/funcs",
  entry: ["src/funcs/*.ts"],
};

const reactConfig: Options = {
  ...baseOptions,
  name: " REACT BUNDLE".padEnd(20),
  entry: ["src/react.tsx"],
};

const reactQueryConfig: Options = {
  ...baseOptions,
  name: " REACT QUERY BUNDLE".padEnd(20),
  outDir: "esm/react-query",
  entry: ["esm/react-query"],
};

export default defineConfig((options: Options) => [
  //{
  //  ...mainConfig,
  //  ...options,
  //},
  //{
  //  ...typesConfig,
  //  ...options,
  //},
  //{
  //  ...libConfig,
  //  ...options,
  //},
  //{
  //  ...funcsConfig,
  //  ...options,
  //},
  //{
  //  ...reactConfig,
  //  ...options,
  //},
  //{
  //  ...reactQueryConfig,
  //  ...options,
  //},
  {
    ...baseOptions,
    entry: ["src/**/*.ts?(x)"],
    dts: true,
    bundle: true,
  },
]);
