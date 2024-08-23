/* eslint-env es6 */

const typescript = require("rollup-plugin-typescript2");
const commonjs = require("@rollup/plugin-commonjs");
const { nodeResolve } = require("@rollup/plugin-node-resolve");
const postcss = require("rollup-plugin-postcss");
const pkg = require("./package.json");

module.exports = {
  input: "src/index.ts",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      sourcemap: true,
      exports: "named",
    },
    {
      file: pkg.module,
      format: "esm",
      sourcemap: true,
      exports: "named",
    },
  ],
  plugins: [
    nodeResolve(),
    commonjs(),
    postcss({
      inject: true,
      minimize: true,
    }),
    typescript({
      tsconfig: "./tsconfig.json",
      clean: true,
    }),
  ],
  external: ["react", "react-dom"],
};
