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
   
  

// open Lead Rating dropdown
await page
  .locator('div')
  .filter({ hasText: /^Lead RatingSelect$/ })
  .getByRole('combobox')
  .click();

// wait for options
await page.locator('div[role="option"]').first().waitFor();

// get all Lead Rating options
const leadRatingOptions = page.locator('div[role="option"]');

// count options
const leadRatingCount = await leadRatingOptions.count();
console.log("Total Lead Rating Options:", leadRatingCount);

// print all options
for (let i = 0; i < leadRatingCount; i++) {
  const text = await leadRatingOptions.nth(i).textContent();
  console.log(`Lead Rating Option ${i}:`, text);
}

// random index
const randomLeadRatingIndex =
  Math.floor(Math.random() * leadRatingCount);

console.log("Random Index Selected:", randomLeadRatingIndex);

// selected value
const selectedLeadRating =
  await leadRatingOptions.nth(randomLeadRatingIndex).textContent();

console.log("Selected Lead Rating:", selectedLeadRating);

// click random option
await leadRatingOptions.nth(randomLeadRatingIndex).click();

// click save
await page.getByRole('button', { name: 'Save' }).click();
  
});