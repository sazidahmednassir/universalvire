// Playwright config in JS to allow code, env, and comments
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: 'tests',
  testMatch: [
    '**/*.spec.ts',
    '**/*.spec.js',
    '**/*.test.ts',
    '**/*.test.js',
  ],
  timeout: 60000,
  expect: { timeout: 5_000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [
    ['list'],
    // Allure results will be written to ./allure-results
    ['allure-playwright', { outputFolder: 'allure-results', detail: true, suiteTitle: false }],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
  ],
  outputDir: 'test-results',
  use: {
    headless: false,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
      launchOptions: {
      args: ["--start-maximized"], // Start browser maximized
    },
  },
  projects: [
    { name: "Google Chrome", 
      use: {
        //  browserName: 'chromium' 
        viewport: null,

        } },
    // { name: 'firefox', use: { browserName: 'firefox' } },
    // { name: 'webkit', use: { browserName: 'webkit' } },
  ],
});
