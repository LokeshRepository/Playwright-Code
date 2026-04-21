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
   
      await page.locator('.lucide.lucide-pencil').nth(16).click();
  await page.getByRole('textbox', { name: 'Enter Urgency' }).click();
  await page.getByRole('textbox', { name: 'Enter Urgency' }).fill('High');
  await page.getByRole('button', { name: 'Save' }).click();
  await page.waitForTimeout(3000);
  //  await page.locator('.lucide.lucide-pencil').nth(13).click();
  //  const calendar = page.locator('.rdp-root');
  // await calendar.waitFor();

  // // ---------------- RANDOM MONTH ----------------
  // const monthDropdown = calendar.getByRole('combobox').first();
  // await monthDropdown.click();

  // const months = page.locator('[role="option"]');
  // const monthCount = await months.count();

  // const randomMonth = Math.floor(Math.random() * monthCount);
  // const monthText = await months.nth(randomMonth).innerText();

  // await months.nth(randomMonth).click();


  // // ---------------- RANDOM YEAR ----------------
  // const yearDropdown = calendar.getByRole('combobox').nth(1);
  // await yearDropdown.click();

  // const years = page.locator('[role="option"]');
  // const yearCount = await years.count();

  // const randomYear = Math.floor(Math.random() * yearCount);
  // const yearText = await years.nth(randomYear).innerText();

  // await years.nth(randomYear).click();


  // // ---------------- RANDOM DATE ----------------
  // const dates = calendar.locator('.rdp-day:not(.rdp-day_disabled)');
  // const dateCount = await dates.count();

  // const randomDate = Math.floor(Math.random() * dateCount);
  // const dateText = await dates.nth(randomDate).innerText();

  // await dates.nth(randomDate).click();


  // // ---------------- PRINT SELECTED DATE ----------------
  // console.log(`Selected Date: ${dateText} ${monthText} ${yearText}`);


  // // ---------------- CLICK SAVE ----------------
  // const saveBtn = page.getByRole('button', { name: 'Save' });
  // await expect(saveBtn).toBeEnabled();
  // await saveBtn.click();
 



});