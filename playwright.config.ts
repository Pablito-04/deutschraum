import { defineConfig } from "@playwright/test";
const base =
  process.env.VITE_BASE_PATH ||
  (process.env.GITHUB_REPOSITORY &&
  !process.env.GITHUB_REPOSITORY.split("/")[1].endsWith(".github.io")
    ? `/${process.env.GITHUB_REPOSITORY.split("/")[1]}/`
    : "/");
export default defineConfig({
  testDir: "./e2e",
  timeout: 90000,
  expect: { timeout: 8000 },
  fullyParallel: true,
  workers: 2,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: `http://127.0.0.1:4173${base}`,
    viewport: { width: 1440, height: 1000 },
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    serviceWorkers: "allow",
  },
  webServer: {
    command: "npm run preview -- --port 4173 --strictPort",
    url: `http://127.0.0.1:4173${base}`,
    reuseExistingServer: !process.env.CI,
  },
});
