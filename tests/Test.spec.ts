import { test, expect } from '@playwright/test';

test('Dashboard Redirection checking', async ({ page }) => {
  await page.goto('https://app.novacrm.ca/');

  await page.getByRole('textbox', { name: 'Email' }).fill('adnan@mmnovatech.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('1234567890');
  await page.getByRole('button', { name: 'Login' }).click();

  await page.waitForURL('**/dashboard');
  await page.waitForLoadState('networkidle');

  // ✅ Wait for Recent Emails section
  const container = page.locator('[class*="emailDetailsContent"]');
  await container.waitFor();

  const noDataText = page.locator('h3', { hasText: /no data/i });

  // ✅ Wait until either data OR no data appears
  await Promise.race([
    container.locator('[class*="emailCard"]').first().waitFor({ state: 'visible', timeout: 10000 }),
    noDataText.waitFor({ state: 'visible', timeout: 10000 })
  ]);

  // ✅ Scoped locator (FIXED)
  const emailCards = container.locator('[class*="emailCard"]');

  const isNoDataVisible = await noDataText.isVisible();
  console.log('No Data Visible:', isNoDataVisible);

  if (isNoDataVisible) {
    console.log('⚠️ No data found - skipping test');
    return;
  }

  const count = await emailCards.count();
  console.log('✅ Email Count:', count);

  const limit = Math.min(count, 3);

  for (let i = 0; i < limit; i++) {
    const card = emailCards.nth(i);

    // 👇 Based on your HTML, these are NOT buttons — they are clickable divs
    const stats = card.locator('[class*="emailStatistics"]');

    const sendBtn = stats.filter({ hasText: 'Sends' });
    const openBtn = stats.filter({ hasText: 'Opens' });

    console.log(`\n🔍 Testing card ${i + 1}`);

    // =========================
    // ✅ OPEN (Opens)
    // =========================
    if (await openBtn.isVisible()) {
      console.log('➡️ Clicking Opens');

      await Promise.all([
        page.waitForNavigation(),
        openBtn.click()
      ]);

      console.log('🌐 URL after Opens:', page.url());

      await page.waitForTimeout(3000); // 👀 visualize
      await page.goBack();
    }

    // =========================
    // ✅ SEND (Sends)
    // =========================
    if (await sendBtn.isVisible()) {
      console.log('➡️ Clicking Sends');

      await Promise.all([
        page.waitForNavigation(),
        sendBtn.click()
      ]);

      console.log('🌐 URL after Sends:', page.url());

      await page.waitForTimeout(3000); // 👀 visualize
      await page.goBack();
    }
  }
});