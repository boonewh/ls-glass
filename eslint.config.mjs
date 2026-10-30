import {defineConfig, globalIgnores} from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTypescript,
  // ImageResponse renders this img into a bitmap, not the website DOM.
  {files: ["app/opengraph-image/route.tsx"], rules: {"@next/next/no-img-element": "off"}},
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts", "test-results/**"]),
]);
