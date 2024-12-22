import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests', // Directory where your tests are located
  timeout: 30 * 1000, // 30 seconds timeout per test
  retries: 1, // Retry once on failure
  use: {
    headless: false, // Set to true to run tests in headless mode
    viewport: { width: 1280, height: 720 },
    baseURL: 'http://localhost:5173', // Your frontend's local dev server URL
  },
});
