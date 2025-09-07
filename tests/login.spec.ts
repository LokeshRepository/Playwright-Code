import { test,expect } from '@playwright/test';
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

  test('invalid login should stay on login page and show error message for invali user', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(users.invalidUser.username, users.invalidUser.password);

    await page.waitForSelector('text=User not found. Please check your email address.', { timeout: 5000 });
  });

  
  test('should show error messages when email,password fields are empty', async ({ page }) => {
    // Navigate to login page
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login("", "");

    // Assert error messages
    await expect(page.locator('text=Email is required.')).toBeVisible();
    await expect(page.locator('text=Password is required.')).toBeVisible();
  });

  test('should show error messages for valid email and invalid password', async ({ page }) => {
    // Navigate to login page
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(users.validUser.username,users.invalidUser.password);

    // Assert error messages
    await expect(page.locator('text=The provided credentials are incorrect.')).toBeVisible();
  });
});
