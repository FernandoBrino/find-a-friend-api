import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()], // understand the @(alias) inside tests.
  test: {
    environmentMatchGlobs: [["src/http/controllers/**", "prisma"]],
  },
});
