import { test, expect } from '@playwright/test';

test('1. Dashboard Redirection checking', async ({ page }) => {
  await page.goto('https://app.novacrm.ca/');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('lokesh@mmnovatech.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('1234567890');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForURL('**/dashboard');
  await page.context().storageState({ path: 'auth.json' });

  //1 Logo Visible 
  await expect(page.locator('img[alt="Nova CRM Logo"]')).toBeVisible();
  //2. Redirects to Credit History
  await page.getByRole('link', { name: 'View History', exact: true }).click();
  await page.waitForTimeout(7000);
  await page.goto('https://v2.novacrm.ca/dashboard');

  //3. Redirects to New leads'
  await page.locator('a[href="/people?new_leads=true"]').getByRole('link').click();
  await page.waitForTimeout(7000);
  await page.goto('https://v2.novacrm.ca/dashboard');


//4. Redirects to Todays Task
  await page.locator('a[href="/task?tab=tasks"]').first().click();;
  await page.waitForTimeout(7000);
  await page.goto('https://v2.novacrm.ca/dashboard');


//5. Redirects to incomplete Followups
  await page.locator('a[href="/people?incomplete_follow_up=true"]').first().click();
  await page.waitForTimeout(7000);
  await page.goto('https://v2.novacrm.ca/dashboard');

//6. Redirects to Marketplace'
  await page.getByRole('link', { name: '.' }).click();
  await page.locator('header').filter({ hasText: 'Marketplace' }).getByRole('button').click();
  await page.waitForTimeout(7000);
  await page.goto('https://v2.novacrm.ca/dashboard');

//7. Redirects to Email Marketing Updaates
  await page.locator('a[href="/email-marketing"]').first().click();
  await page.waitForTimeout(7000);
  await page.goto('https://v2.novacrm.ca/dashboard');

  //8. Redirects to SMM Updaates
  await page.locator('a[href="/social-media"]').first().click();
  await page.waitForTimeout(7000);
  await page.goto('https://v2.novacrm.ca/dashboard');

  //9. Automation Update
  await page.getByText('View All Automation').first().click();
  await page.waitForTimeout(7000);
  await page.goto('https://v2.novacrm.ca/dashboard');

  //10. Task Update
  await page.locator('.CalendarToolbar-module-scss-module__ARJ8uq__viewMore').first().click();
  await page.waitForTimeout(7000);
  await page.goto('https://v2.novacrm.ca/dashboard');
  
//11 Email Analytics Redirections
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

  //11. Support Redirection
  await page.getByRole('button', { name: 'Getting Started' }).first().click();
  await page.waitForTimeout(7000);
  await page.goto('https://v2.novacrm.ca/dashboard');


});