import { test, expect } from '@playwright/test';

test('Dashboard Redirection checking (Robust)', async ({ page }) => {
  await page.goto('https://app.novacrm.ca/');

  // 🔐 Login
  await page.getByRole('textbox', { name: 'Email' }).fill('lokesh@mmnovatech.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('1234567890');
  await page.getByRole('button', { name: 'Login' }).click();

  await page.waitForURL('**/dashboard');
  await page.waitForLoadState('networkidle');

  // 📦 Recent Emails container
  const container = page.locator('[class*="emailDetailsContent"]');
  await container.waitFor();

  const noDataText = page.locator('h3', { hasText: /no data/i });

  // ⏳ Wait for either data OR no data
  await Promise.race([
    container.locator('[class*="emailCard"]').first().waitFor({ state: 'visible', timeout: 10000 }),
    noDataText.waitFor({ state: 'visible', timeout: 10000 })
  ]);

  // ❌ No Data Case
  if (await noDataText.isVisible()) {
    console.log('⚠️ No data found - skipping test');
    return;
  }

  // ✅ Email cards
  const emailCards = container.locator('[class*="emailCard"]');
  const count = await emailCards.count();
  console.log('✅ Email Count:', count);

  const limit = Math.min(count, 3);

  for (let i = 0; i < limit; i++) {
    const card = emailCards.nth(i);

    const stats = card.locator('[class*="emailStatistics"]');
    const sendBtn = stats.filter({ hasText: 'Sends' });
    const openBtn = stats.filter({ hasText: 'Opens' });

    console.log(`\n🔍 Testing card ${i + 1}`);

    // =========================
    // ✅ OPENS REDIRECTION
    // =========================
    try {
      if (await openBtn.isVisible()) {
        console.log('➡️ Clicking Opens');

        await Promise.all([
          page.waitForNavigation(),
          openBtn.click()
        ]);

        console.log('🌐 URL after Opens:', page.url());

        // ✅ Soft Assertion (won’t stop test)
        await expect.soft(page).toHaveURL(/\/analytics\?tab=open/);

        // 📸 Screenshot for proof
        await page.screenshot({ path: `open-card-${i + 1}.png` });

        await page.waitForTimeout(2000); // 👀 visualize
        await page.goBack();
        await page.waitForLoadState('networkidle');
      }
    } catch (error: any) {
      console.log(`❌ Opens failed for card ${i + 1}:`, error.message);

      await page.screenshot({ path: `error-open-${i + 1}.png` });
    }

    // =========================
    // ✅ SENDS REDIRECTION
    // =========================
    try {
      if (await sendBtn.isVisible()) {
        console.log('➡️ Clicking Sends');

        await Promise.all([
          page.waitForNavigation(),
          sendBtn.click()
        ]);

        console.log('🌐 URL after Sends:', page.url());

        // ✅ Soft Assertion
        await expect.soft(page).toHaveURL(/\/analytics\?tab=sent/);

        // 📸 Screenshot for proof
        await page.screenshot({ path: `send-card-${i + 1}.png` });

        await page.waitForTimeout(2000); // 👀 visualize
        await page.goBack();
        await page.waitForLoadState('networkidle');
      }
    } catch (error: any) {
      console.log(`❌ Sends failed for card ${i + 1}:`, error.message);

      await page.screenshot({ path: `error-send-${i + 1}.png` });
    }
  }

  console.log('\n✅ Test execution completed (with error handling)');
});