import react from "@vitejs/plugin-react";
import flow from "lodash/flow";
import mapValues from "lodash/mapValues";
import omitBy from "lodash/omitBy";
import pickBy from "lodash/pickBy";
import path from "path";
import { defineConfig } from "vite";
import { injectHtml, minifyHtml } from "vite-plugin-html";
import reactJsx from "vite-react-jsx";
import tsconfig from "./tsconfig.json";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactJsx(),
    react(),
    minifyHtml(),
    injectHtml({
      data: pickBy(process.env, (value, key) => key.startsWith("VITE_")),
    }),
  ],
  resolve: {
    alias: flow(
      (paths: Record<string, string[]>) =>
        omitBy(paths, (paths) => paths[0].endsWith("/*")),
      (paths) => mapValues(paths, (value) => path.join(__dirname, value[0]))
    )(tsconfig.compilerOptions.paths),
  },
  base: "",
});
