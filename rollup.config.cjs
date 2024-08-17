/* eslint-env es6 */

var typescript = require("rollup-plugin-typescript2");
var commonjs = require("@rollup/plugin-commonjs");
var { nodeResolve } = require("@rollup/plugin-node-resolve");
var css = require("rollup-plugin-css-only");
var pkg = require("./package.json");

module.exports = {
  input: "src/index.ts",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      exports: "named",
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: "es",
      exports: "named",
      sourcemap: true,
    },
  ],
  plugins: [
    nodeResolve(),
    commonjs(),
    css({ output: "dist/styles.css" }),
    typescript({
      tsconfig: "./tsconfig.json",
      clean: true,
    }),
  ],
  external: ["react", "react-dom"],
};
