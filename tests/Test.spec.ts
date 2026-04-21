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
   

   await page.locator('.lucide.lucide-pencil').nth(9).click();
  await page.getByRole('textbox', { name: 'Enter Avg Property Price' }).click();
  await page.getByRole('textbox', { name: 'Enter Avg Property Price' }).fill('2000000');
  await page.waitForTimeout(6000);
  await page.getByRole('button', { name: 'Save' }).click();



});