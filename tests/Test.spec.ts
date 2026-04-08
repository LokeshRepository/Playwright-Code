import { test, expect } from '@playwright/test';

test('Dashboard Redirection checking (Robust)', async ({ page }) => {
  await page.goto('https://app.novacrm.ca/');

  // 🔐 Login
  await page.getByRole('textbox', { name: 'Email' }).fill('lokesh@mmnovatech.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('1234567890');
  await page.getByRole('button', { name: 'Login' }).click();

  await page.waitForURL('**/dashboard');
   await page.locator('button.GoToCartBottomNavButton-module__-vuNVq__container').click();
await page.waitForTimeout(2000);
  // verify redirected URL
  await expect(page).toHaveURL(/\/payment\/cart/);
});