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
   
  await page.locator('section').filter({ hasText: /^Is this lead a Realtor\?$/ }).getByRole('button').nth(1).click();
  await page.locator('section').filter({ hasText: /^Is this lead a Realtor\?$/ }).getByRole('button').first().click();
  await page.getByRole('heading', { name: 'Social Profile' }).locator('svg').click();
  await page.getByRole('textbox', { name: 'Instagram profile URL' }).click();
  await page.getByRole('textbox', { name: 'Instagram profile URL' }).fill('instagram.com');
  await page.getByRole('textbox', { name: 'Facebook profile URL' }).click();
  await page.getByRole('textbox', { name: 'Facebook profile URL' }).fill('Facebook.com');
  await page.getByRole('textbox', { name: 'Twitter profile URL' }).click();
  await page.getByRole('textbox', { name: 'Twitter profile URL' }).fill('Twitter.com');
  await page.getByRole('button', { name: 'Save' }).click();
  await page.getByText('Custom Lead Data').click();
  await page.locator('div').filter({ hasText: /^Mortgage typeSelect$/ }).getByRole('combobox').click();
  await page.getByText('Refinance/Renewal').click();
  await page.getByRole('button', { name: 'Save' }).click();

});