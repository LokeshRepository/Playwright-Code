import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://app.novacrm.ca/');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('lokesh@mmnovatech.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('1234567890');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForURL('**/dashboard');
  await page.context().storageState({ path: 'auth.json' });
  await page.getByRole('link', { name: 'View History', exact: true }).click();
  await page.goto('https://v2.novacrm.ca/dashboard');
  await page.getByRole('link', { name: 'New Leads New Leads 0 View All' }).getByRole('link').click();
  await page.goto('https://v2.novacrm.ca/dashboard');
  await page.getByRole('link', { name: 'Today\'s Task Today\'s Task 0' }).getByRole('link').click();
  await page.getByRole('link', { name: 'Incomplete Follow Ups' }).getByRole('link').click();
  await page.goto('https://v2.novacrm.ca/dashboard');
  await page.getByRole('link', { name: '.' }).click();
  await page.locator('header').filter({ hasText: 'Marketplace' }).getByRole('button').click();
});