import { test } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { DashboardPage } from '../pages/dashboard.page';
import { users } from '../utils/test-data';

test.describe('NovaCRM Login', () => {
  test('valid login should navigate to dashboard', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.goto();
    await loginPage.login(users.validUser.username, users.validUser.password);
    await dashboardPage.assertDashboardVisible();
  });

  test('invalid login should stay on login page', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(users.invalidUser.username, users.invalidUser.password);

    await page.waitForSelector('text=User not found. Please check your email address.', { timeout: 5000 });
  });
});
