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
  // await page.locator('tbody').waitFor();
  // // find correct row using email + phone
  //  await page.locator('tbody').waitFor();
  //                                                             // find row using email
  // const TestData = page.locator('tbody tr', {
  //   has: page.getByText('lokesh@mmnovatech.com')
  // });
  // await expect(TestData).toBeVisible();                                           
  // await TestData.locator('.text-sky-600').first().click(); // click first name (Lokesh)
                                                    
await page.locator('button:nth-child(4)').click();
  await page.getByRole('textbox', { name: 'First name *' }).click();
  await page.getByRole('textbox', { name: 'First name *' }).fill('Lokesh');
  await page.getByRole('textbox', { name: 'Last name' }).click();
  await page.getByRole('textbox', { name: 'Last name' }).fill('Joshi');
  await page.getByRole('textbox', { name: 'Email Address' }).click();
  await page.getByRole('textbox', { name: 'Email Address' }).fill('Lokesh@mmnovatech.com');
  await page.getByRole('combobox').filter({ hasText: '+' }).click();
  await page.getByRole('option', { name: '+91' }).click();
  await page.getByRole('textbox', { name: 'Phone No.' }).click();
  await page.getByRole('textbox', { name: 'Phone No.' }).fill('8421020309');
  await page.getByRole('button', { name: 'Save Lead' }).click();

await page.locator('tbody').waitFor();
  // find correct row using email + phone
   await page.locator('tbody').waitFor();
                                                              // find row using email
  const TestData = page.locator('tbody tr', {
    has: page.getByText('lokesh@mmnovatech.com')
  });
  await expect(TestData).toBeVisible();                                           
  await TestData.locator('.text-sky-600').first().click(); // click first name (Lokesh)

  await page.getByRole('button', { name: 'Delete lead' }).click();
  await page.getByRole('button', { name: 'Yes' }).click();
  await page.getByRole('button', { name: 'Yes, Confirm' }).click();
});