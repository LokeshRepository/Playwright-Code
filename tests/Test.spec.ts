import { test, expect, Page } from '@playwright/test';

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
  await page.waitForTimeout(5000);


// await page.locator('input[type="file"]')
//   .setInputFiles('tests/Lokesh Joshi_IDCard.pdf');
//  await page.waitForTimeout(2000);

   await page.locator('input[name="planning_to_sell"]').fill('2 months');
await page.getByRole('button', { name: 'Save' }).click();
//   await page.locator('div', { hasText: 'Lokesh Joshi_IDCard.pdf' }).locator('.lucide-trash').click();
// await page.locator('input[type="file"]').setInputFiles('tests/Lokesh Joshi_IDCard.pdf');
// await page.waitForTimeout(2000);
//  await page.locator('div', { hasText: 'Lokesh Joshi_IDCard.pdf' }).locator('.lucide-trash').click();
});
async function selectRandomDropdown(page: Page, dropdownName: string) {

  // open dropdown
  await page.getByRole('button', { name: dropdownName }).click();
await page.waitForTimeout(2000);

  // wait dropdown
  const dropdown = page.locator('.max-h-\\[300px\\].overflow-y-auto');
  await dropdown.waitFor();

  // get options
  const options = dropdown.locator('> div');

  // count
  const count = await options.count();
  console.log(`${dropdownName} count:`, count);

  // random index
  const randomIndex = Math.floor(Math.random() * count);

  // text
  const selectedText = await options.nth(randomIndex).textContent();
  console.log(`Selected ${dropdownName}:`, selectedText);

  // click
  await options.nth(randomIndex).click();

}
