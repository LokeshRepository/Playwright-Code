import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests', // your test folder
  timeout: 1000 * 1000,
  retries: 0, // optional: retry failed tests once
  reporter: [ ['html', { open: 'always' }],// <-- enables HTML report
              ['list'],  // keep console output
              ['allure-playwright'] // add allure], 
  ],
  use: {
    headless: false,
    screenshot: 'only-on-failure', // takes screenshots on failure
    video: 'retain-on-failure',    // records video for failed tests
    trace: 'on-first-retry',        // captures trace for debugging
    baseURL: 'https://novacrm.ai',  
        
  },
  
/*use: {
  headless: false,                 // 👀 show browser
  screenshot: 'off',                // 📸 capture every step
  video: 'off',                     // 🎥 record all tests
  trace: 'on',                     // 🔍 full trace (best debugging)
  launchOptions: {
    slowMo: 800,                  // 🐢 slow down actions (VERY IMPORTANT)
  },
}*/


});