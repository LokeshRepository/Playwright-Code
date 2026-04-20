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
  await page.waitForTimeout(7000);
   
  await page.locator('.lucide.lucide-pencil').nth(7).click();
  await page.getByRole('textbox', { name: 'Enter City' }).click();
  await page.getByRole('textbox', { name: 'Enter City' }).fill('Ontario');
  await page.getByRole('button', { name: 'Save' }).click();
await page.waitForTimeout(3000);
   await page.locator('.lucide.lucide-pencil').nth(8).click();
  await page.getByRole('textbox', { name: 'Enter Postal Code' }).click();
  await page.getByRole('textbox', { name: 'Enter Postal Code' }).fill('L4B3B2');
  await page.getByRole('button', { name: 'Save' }).click();
await page.waitForTimeout(3000);
   await page.locator('.lucide.lucide-pencil').nth(9).click();
  await page.getByRole('textbox', { name: 'Enter Avg Property Price' }).click();
  await page.getByRole('textbox', { name: 'Enter Avg Property Price' }).fill('20M');
  await page.getByRole('button', { name: 'Save' }).click();
await page.waitForTimeout(3000);
  await page.locator('.lucide.lucide-pencil').nth(10).click();
  await page.getByRole('textbox', { name: 'Enter Buy Area' }).click();
  await page.getByRole('textbox', { name: 'Enter Buy Area' }).fill('Brampton');
  await page.getByRole('button', { name: 'Save' }).click();
await page.waitForTimeout(3000);
 await page.locator('.lucide.lucide-pencil').nth(11).click();
  await page.getByRole('textbox', { name: 'Enter Home Type' }).click();
  await page.getByRole('textbox', { name: 'Enter Home Type' }).fill('Codo');
  await page.getByRole('button', { name: 'Save' }).click();
await page.waitForTimeout(3000);

await page.locator('.lucide.lucide-pencil').nth(12).click();
  await page.getByRole('button', { name: 'Select Start Date' }).click();
  // Pick today's date (calendar day button)
  await page.locator('[role="gridcell"]:not([aria-disabled="true"])').first().click();
  // Click Save
  await page.getByRole('button', { name: 'Save' }).click();

});