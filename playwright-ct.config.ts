import { defineConfig, devices } from "@playwright/experimental-ct-react";

export default defineConfig({
  // ✅ tes tests sont là
  testDir: "./src/components/__ct__",
  // ✅ pour être sûr de matcher .spec.jsx
  testMatch: /.*\.spec\.(js|jsx|ts|tsx)/,

  snapshotDir: "./__snapshots__",
  timeout: 10 * 1000,
  fullyParallel: true,
  reporter: "html",

  use: {
    trace: "on-first-retry",
    ctPort: 3100,
  },

  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
  ],
});
