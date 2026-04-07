import { test, expect } from '@playwright/test';

test('Dashboard Redirection checking (Robust)', async ({ page }) => {
  await page.goto('https://app.novacrm.ca/');

  // 🔐 Login
  await page.getByRole('textbox', { name: 'Email' }).fill('lokesh@mmnovatech.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('1234567890');
  await page.getByRole('button', { name: 'Login' }).click();

  await page.waitForURL('**/dashboard');
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
});