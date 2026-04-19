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
//Test Case for Address
await page.locator('.lucide.lucide-pencil').nth(5).click();
  await page.keyboard.press('ControlOrMeta+A');
await page.keyboard.press('Backspace');
// type like real user
const input = page.locator('#googleSearch');

await input.click();

// remove everything including spaces
await input.press('ControlOrMeta+A');
await input.press('Backspace');

// type (not fill)
await input.type('canada', { delay: 80 });
  // wait for dropdown to appear
  await page.waitForTimeout(3000);
  await page.locator('.pac-item').first().waitFor();
  // get all options
  const options1 = page.locator('.pac-item');
  // count
  const count1 = await options1.count();
  // pick random
  const randomIndex1 = Math.floor(Math.random() * count1);
  console.log('Selected count:',count1 );
  // get text
  const selectedAddress = await options1.nth(randomIndex1).innerText();
  console.log('Selected Address:', selectedAddress);
  // click random option
  await options1.nth(randomIndex1).click();
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Save' }).click();
  // await page.locator('.lucide.lucide-pencil').nth(5).click();
  // await page.getByRole('textbox', { name: 'Please enter address' }).click();
  // await page.fill('#googleSearch', 'canada');

  // // wait for dropdown to appear
  // await page.locator('.pac-item').first().waitFor();

  // // get all options
  // const options = page.locator('.pac-item');

  // // count
  // const count = await options.count();

  // // pick random
  // const randomIndex = Math.floor(Math.random() * count);

  // // get text
  // const selectedAddress = await options.nth(randomIndex).innerText();

  // console.log('Selected Address:', selectedAddress);

  // // click random option
  // await options.nth(randomIndex).click();
  // await page.waitForTimeout(7000);
  // await page.getByRole('button', { name: 'Save' }).click();

});