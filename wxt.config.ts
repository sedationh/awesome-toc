import { defineConfig } from "wxt";
import react from "@vitejs/plugin-react";

// See https://wxt.dev/api/config.html
export default defineConfig({
  vite: () => ({
    plugins: [react()],
  }),
  manifest: {
    permissions: ["storage", "contextMenus"],
    homepage_url: "https://awesome-toc.vercel.app/",
    commands: {
      "toggle-toc": {
        suggested_key: {
          default: "Alt+T",
          mac: "Alt+T",
        },
        description: "Show TOC",
      },
    },
  },
});
