import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import cleanup from "rollup-plugin-cleanup";

export default {
  input: "./src/index.ts",
  output: {
    file: "./dist/index.js",
    format: "iife",
  },
  plugins: [
    typescript({
      tsconfig: "tsconfig.json",
    }),
    terser(),
    cleanup({ comments: "none" }),
  ],
};
