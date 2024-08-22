/* eslint-env es6 */

var typescript = require("rollup-plugin-typescript2");
var commonjs = require("@rollup/plugin-commonjs");
var { nodeResolve } = require("@rollup/plugin-node-resolve");
var postcss = require("rollup-plugin-postcss");
var pkg = require("./package.json");

module.exports = {
  input: "src/index.ts",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      exports: "auto",
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: "es",
      exports: "auto",
      sourcemap: true,
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
