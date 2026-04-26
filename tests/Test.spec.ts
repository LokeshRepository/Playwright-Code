import { test, expect, Page } from '@playwright/test';

test('1. Dashboard Redirection checking', async ({ page }) => {
  await page.goto('https://app.novacrm.ca/');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('lokesh@mmnovatech.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('1234567890');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForURL('**/dashboard');
  await page.context().storageState({ path: 'auth.json' });
  await page.goto('https://v2.novacrm.ca/people');
  //Step 1: Search for perticular lead
  await page.waitForURL('**/people');
  await page.locator('tbody').waitFor();
  // find correct row using email + phone
  await page.locator('tbody').waitFor();
  // find row using email
  const TestData = page.locator('tbody tr', {
    has: page.getByText('lokesh@mmnovatech.com')
  });
  await expect(TestData).toBeVisible();
  // click first name (Lokesh)
  await TestData.locator('.text-sky-600').first().click();
  await page.waitForTimeout(5000);



 await page.locator('div').filter({ hasText: /^Add$/ }).getByRole('button').click();

// await page.locator('input[type="file"]')
//   .setInputFiles('tests/Lokesh Joshi_IDCard.pdf');
//  await page.waitForTimeout(2000);
   
//   await page.locator('div', { hasText: 'Lokesh Joshi_IDCard.pdf' }).locator('.lucide-trash').click();
await page.locator('input[type="file"]').setInputFiles('tests/Lokesh Joshi_IDCard.pdf');
await page.waitForTimeout(2000);
 await page.locator('div', { hasText: 'Lokesh Joshi_IDCard.pdf' }).locator('.lucide-trash').click();
});
