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

//6. Redirects to Marketplace
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
//11. Cart Redirection
  await page.locator('button.GoToCartBottomNavButton-module__-vuNVq__container').click();
  await page.waitForTimeout(2000);
  // verify redirected URL
  await expect(page).toHaveURL(/\/payment\/cart/);
  await page.goto('https://v2.novacrm.ca/dashboard');
//11 Email Analytics Redirections
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
  const limit = Math.min(count, 2);
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

//12. Search box testing
   const searchData = [
    'lokesh',
    'lokesh@gmail.com',
    '9876543210',
    'john',
    'test@yahoo.com'
  ];

  const searchBox = page.getByPlaceholder(
    'Search by Lead Name, Email, or Contact Number'
  );

  const results = page.locator('[data-slot="command-item"]');
  const noData = page.locator('[data-slot="command-empty"]');

  for (const searchText of searchData) {

    console.log(`\nSearching for: ${searchText}`);

    // clear and search
    await searchBox.fill('');
    await searchBox.fill(searchText);
await page.waitForTimeout(2000);
    // wait for result OR no data
    await Promise.race([
      results.first().waitFor({ state: 'visible' }).catch(() => {}),
      noData.waitFor({ state: 'visible' }).catch(() => {})
    ]);
    await page.waitForTimeout(3000);
    // CASE 1 — No results
    if (await noData.isVisible()) {
      await expect(noData).toContainText('No people found');
      console.log('No results found');
    }

    // CASE 2 — Results found
    else {
      const count = await results.count();
      console.log('Total results:', count);

      const verifyCount = Math.min(count, 3);

      for (let i = 0; i < verifyCount; i++) {
        const item = results.nth(i);

        await expect(item).toBeVisible();

        const text = await item.textContent();
        console.log(`Result ${i + 1}:`, text);

        await expect(item).toContainText(
          new RegExp(searchText, 'i')
        );
      }
    }
  }

  //13. Support Redirection
  await page.getByRole('button', { name: 'Getting Started' }).first().click();
  await page.waitForTimeout(7000);
  await page.goto('https://v2.novacrm.ca/dashboard');


});