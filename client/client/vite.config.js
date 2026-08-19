import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

// Get the ngrok URL from environment
const NGROK_HOST = process.env.VITE_BASE_URL
  ? new URL(process.env.VITE_BASE_URL).host
  : null;

export default defineConfig({
  plugins: [tailwindcss()],
  server: {
    host: true,
    port: 5173,
    allowedHosts: [
      "localhost",
      ".ngrok-free.dev",
      "unmilitarized-unvivaciously-kaylynn.ngrok-free.dev",
      NGROK_HOST,
    ].filter(Boolean),
  },
  build: {
    outDir: "dist",
  },
});
