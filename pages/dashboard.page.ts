import { Page, expect } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly dashboardHeader = 'a.active';

  constructor(page: Page) {
    this.page = page;
  }

  async assertDashboardVisible() {
    await expect(this.page.locator(this.dashboardHeader)).toBeVisible({ timeout: 30000 });
  }
}