import { UserConfigExport, defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default ({ mode }): UserConfigExport => {
  return defineConfig({
    plugins: [react()],
    build: {
      lib: {
        entry: path.resolve(__dirname, "src/main.tsx"),
        name: "vite-requestly",
        fileName: "vite-requestly",
      },
      rollupOptions: {
        output: {
          assetFileNames: "vite-requestly.[ext]",
        },
        /**
         * Ignore "use client" warning since we are not using SSR
         * @see {@link https://github.com/TanStack/query/pull/5161#issuecomment-1477389761 Preserve 'use client' directives TanStack/query#5161}
         */
        onwarn(warning, warn) {
          if (
            warning.code === "MODULE_LEVEL_DIRECTIVE" &&
            warning.message.includes(`"use client"`)
          ) {
            return;
          }
          warn(warning);
        },
      },
    },
    define: {
      "process.env.NODE_ENV": JSON.stringify(mode),
    },
  });
};
