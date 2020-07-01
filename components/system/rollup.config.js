import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import external from "rollup-plugin-peer-deps-external";

import { main } from "./package.json";
const input = "./index.js";

export default [
  {
    input,
    output: {
      file: main,
      format: "cjs",
    },
    plugins: [
      babel({
        exclude: "node_modules/**",
        runtimeHelpers: true,
      }),
      external(),
      resolve(),
      commonjs({
        namedExports: {
          "node_modules/react-tippy/dist/react-tippy.js": ["Tooltip"],
        },
      }),
    ],
  },
];
