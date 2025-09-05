import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests', // your test folder
  timeout: 50 * 1000,
  retries: 1, // optional: retry failed tests once
  reporter: [['html', { open: 'always' }]], // <-- enables HTML report
  use: {
    headless: true,
    screenshot: 'only-on-failure', // takes screenshots on failure
    video: 'retain-on-failure',    // records video for failed tests
    trace: 'on-first-retry',        // captures trace for debugging
    baseURL: 'https://novacrm.ai',      
  },
});