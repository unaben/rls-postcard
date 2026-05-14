import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {},
    video: true,
    retries: {
      openMode: 0,
      runMode: 2,
    },
  },
});