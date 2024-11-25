import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, "../", "");
  return {
    plugins: [react()],
    //envDir: "../",
    server: {
      proxy: {
        "/api": {
          target:
            env.NODE_ENV === "production"
              ? env.REMOTE_API_BASE_URL
              : env.LOCAL_API_BASE_URL,
          changeOrigin: true,
        },
      },
    },
  };
});
