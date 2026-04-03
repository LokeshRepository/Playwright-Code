import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { DashboardPage } from '../pages/dashboard.page';
import { users } from '../utils/test-data';
test('NovaCRM dashboard navigation', async ({ page }: { page: Page }) => {
  // Login
const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.goto();
    await loginPage.login(users.validUser.username, users.validUser.password);
    await dashboardPage.assertDashboardVisible();

  // Dashboard navigation
  await page.goto('https://app.novacrm.ca/dashboard');
   await page.getByRole('link', { name: 'View History', exact: true }).click();
  await page.locator('div').filter({ hasText: /^Settings$/ }).getByRole('img').click();
  await page.getByRole('link', { name: 'New Leads 0 View All' }).getByRole('link').click();
  await page.getByRole('link', { name: 'Home' }).click();
  await page.getByRole('link', { name: 'Today\'s Task 0 View All' }).getByRole('link').click();
  await page.getByRole('link', { name: 'Home' }).click();
  await page.getByRole('link', { name: 'Incomplete Follow Ups 408' }).getByRole('link').click();
  await page.getByRole('link', { name: 'Home' }).click();
  await page.locator('.Homepage_slide__x897u').first().click();
  await page.getByRole('link', { name: 'Home' }).click();
  await page.locator('div').filter({ hasText: /^Social MediaView More$/ }).getByRole('link').click();
  await page.getByRole('link', { name: 'Home' }).click();
  await page.locator('div').filter({ hasText: /^Email MarketingView More$/ }).getByRole('link').click();
  await page.goto('https://app.novacrm.ca/dashboard');
  const page2Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'Getting Started' }).click();
  const page2 = await page2Promise;
  await page.getByRole('link', { name: 'View All Automation' }).click();
  await page.locator('i').nth(3).click();
  await page.locator('div').filter({ hasText: /^View More$/ }).getByRole('link').click();
  await page.goto('https://app.novacrm.ca/dashboard');

  // View History
//   await page.getByRole('link', { name: 'View History', exact: true }).click();
//   await expect(page).toHaveURL('https://app.novacrm.ca/profile#credit-history');
//   await page.goto('https://app.novacrm.ca/dashboard');

//   // New Leads
//   await page.getByRole('link', { name: 'New Leads 0 View All' }).getByRole('link').click();
//   await expect(page).toHaveURL('https://app.novacrm.ca/people?new_leads=true');
//   await page.goto('https://app.novacrm.ca/dashboard');

//   // Today’s Task
//   const todayTaskCard = page.locator('div:has-text("Today\'s Task")');
// await todayTaskCard.getByRole('link', { name: 'View All' }).click();

//   await expect(page).toHaveURL('https://app.novacrm.ca/task?tab=tasks');
//   await page.goto('https://app.novacrm.ca/dashboard');

//   // Incomplete Follow Ups
//   await page.getByRole('link', { name: 'Incomplete Follow Ups 408 View' }).getByRole('link').click();
//   await expect(page).toHaveURL('https://app.novacrm.ca/people?incomplete_follow_up=true');
//   await page.goto('https://app.novacrm.ca/dashboard');

  // // Slide actions
  // await page.locator('.Homepage_slide__x897u').first().click();
  // await page.locator('.cursor-pointer').first().click();
  // await page.goto('https://app.novacrm.ca/dashboard');

  // // Social Media
  // await page.locator('div').filter({ hasText: /^Social MediaIntrestingView More$/ }).getByRole('link').click();
  // await expect(page).toHaveURL('https://app.novacrm.ca/social-media');
  // await page.goto('https://app.novacrm.ca/dashboard');

  // // Email Marketing
  // await page.locator('div').filter({ hasText: /^Email MarketingView More$/ }).getByRole('link').click();
  // await expect(page).toHaveURL('https://app.novacrm.ca/email-marketing');
  // await page.goto('https://app.novacrm.ca/dashboard');

  // // Automation
  // await page.getByRole('link', { name: 'View All Automation' }).click();
  // await expect(page).toHaveURL('https://app.novacrm.ca/automation');
  // await page.goto('https://app.novacrm.ca/dashboard');

  // // Getting Started (popup)
  // const page1Promise = page.waitForEvent('popup');
  // await page.getByRole('button', { name: 'Getting Started' }).click();
  // const page1 = await page1Promise;
  // await expect(page1).toHaveURL('https://support.novacrm.ca/en/');
});
