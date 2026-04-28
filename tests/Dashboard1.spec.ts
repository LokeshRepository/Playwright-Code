import { test, expect, Page } from '@playwright/test';

let page: Page;

test.describe.serial('Dashboard Tests', () => {

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();

  await page.goto('https://app.novacrm.ca/');
   await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('lokesh@mmnovatech.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('1234567890');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForURL('**/dashboard');
  await page.context().storageState({ path: 'auth.json' });

});
test('1. Logo Visible', async () => {
  await expect(page.locator('img[alt="Nova CRM Logo"]')).toBeVisible();
});

test('2. Credit History Redirect', async () => {
  await page.getByRole('link', { name: 'View History', exact: true }).click();
});

test('3. New Leads Redirect', async () => {
  await page.goto('https://v2.novacrm.ca/dashboard');
  await page.locator('a[href="/people?new_leads=true"]').first().click();
});

test('4. Today Task Redirect', async () => {
  await page.goto('https://v2.novacrm.ca/dashboard');
  await page.locator('a[href="/task?tab=tasks"]').first().click();
});

test('5. Incomplete Followups', async () => {
  await page.goto('https://v2.novacrm.ca/dashboard');
  await page.locator('a[href="/people?incomplete_follow_up=true"]').first().click();
});

test('6. Marketplace Redirect', async () => {
  await page.goto('https://v2.novacrm.ca/dashboard');
  await page.getByRole('link', { name: '.' }).click();
});

test('7. Email Marketing', async () => {
  await page.goto('https://v2.novacrm.ca/dashboard');
  await page.locator('a[href="/email-marketing"]').first().click();
});

test('8. Social Media', async () => {
  await page.goto('https://v2.novacrm.ca/dashboard');
  await page.locator('a[href="/social-media"]').first().click();
});

test('9. Automation', async () => {
  await page.goto('https://v2.novacrm.ca/dashboard');
  await page.getByText('View All Automation').first().click();
});

test('10. Task Update', async () => {
  await page.goto('https://v2.novacrm.ca/dashboard');
  await page.locator('.CalendarToolbar-module-scss-module__ARJ8uq__viewMore').first().click();
});

test('11. Cart Redirection', async () => {
  await page.goto('https://v2.novacrm.ca/dashboard');
  await page.locator('button.GoToCartBottomNavButton-module__-vuNVq__container').click();
  await expect(page).toHaveURL(/\/payment\/cart/);
});




test('12. Email Analytics', async () => {
  // paste your analytics code here
});

test('13. Search + Support', async () => {
  // paste search code
  // support redirect
});

});
