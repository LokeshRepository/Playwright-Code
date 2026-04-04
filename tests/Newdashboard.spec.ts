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

  //2. Redirects to Credit History
  await page.getByRole('link', { name: 'View History', exact: true }).click();
  await page.waitForTimeout(7000);
  await page.goto('https://v2.novacrm.ca/dashboard');

  //3. Redirects to New leads'
  await page.locator('a[href="/people?new_leads=true"]').getByRole('link').click();
  await page.waitForTimeout(7000);
  await page.goto('https://v2.novacrm.ca/dashboard');


//4. Redirects to Todays Task
  await page.getByRole('link', { name: 'Today\'s Task Today\'s Task 0' }).getByRole('link').click();
  await page.waitForTimeout(7000);
  await page.goto('https://v2.novacrm.ca/dashboard');


//5. Redirects to incomplete Followups
  await page.locator('a[href="/task?tab=tasks"]').getByRole('link').click();
  await page.getByRole('link', { name: 'Incomplete Follow Ups' }).getByRole('link').click();
  await page.waitForTimeout(7000);
  await page.goto('https://v2.novacrm.ca/dashboard');

//6. Redirects to Marketplace'
  await page.getByRole('link', { name: '.' }).click();
  await page.waitForTimeout(7000);
  await page.locator('header').filter({ hasText: 'Marketplace' }).getByRole('button').click();
});