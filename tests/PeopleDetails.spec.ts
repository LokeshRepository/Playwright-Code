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
//Step 1: Create Lead
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

//Step 2: Details verification +CRUD
await page.locator('span:has-text("Phone:")')
  .locator('xpath=ancestor::div[1]')
  .locator('button')
  .click();
  await page.waitForTimeout(1000);
   await page.getByRole('button', { name: 'Add another phone number' }).click();
await page.locator('select').nth(1).selectOption('+91');
await page.locator('input[name="phones.1.value"]').fill('9930010201');
await page.getByRole('button', { name: 'Save' }).click();
  await page.locator('div').filter({ hasText: /^Phone:\+918421020309Default\+919930010201$/ }).getByRole('button').click();
  await page.locator('form').getByRole('button').nth(1).click();
  await page.getByRole('button', { name: 'Save' }).click();


  await page.locator('div').filter({ hasText: /^Email:Lokesh@mmnovatech\.comDefault$/ }).getByRole('button').click();
  await page.getByRole('button', { name: 'Add another email' }).click();
  await page.locator('input[name="emails.1.value"]').click();
  await page.locator('input[name="emails.1.value"]').fill('Lokesh+1@mmnovatech.com');
  await page.getByRole('button', { name: 'Save' }).click();
  await page.locator('div').filter({ hasText: /^Email:Lokesh@mmnovatech\.comDefaultLokesh\+1@mmnovatech\.com$/ }).getByRole('button').click();
  await page.locator('form').getByRole('button').nth(1).click();
  await page.getByRole('button', { name: 'Save' }).click();


                                                          //Test case for source Testing
  await page.locator('.lucide.lucide-pencil').nth(3).click();
  await page.locator('#source').click();
const options = page.getByRole('option');// get options
const count = await options.count();// random index
const randomIndex = Math.floor(Math.random() * count);
const selected = await options.nth(randomIndex).textContent();
console.log("Selected value:", selected);
await options.nth(randomIndex).click();
 await page.waitForTimeout(2000);
await page.getByRole('button', { name: 'Save' }).waitFor();
await page.getByRole('button', { name: 'Save' }).click();

                                              //Test case for Lead Type Testing
await page.locator('.lucide.lucide-pencil').nth(4).click();                                                
await page.locator('#leadType').click();
const leadTypeOptions = page.getByRole('option');
const leadTypeCount = await leadTypeOptions.count();
const randomLeadTypeIndex = Math.floor(Math.random() * leadTypeCount);
const selectedLeadType = await leadTypeOptions.nth(randomLeadTypeIndex).textContent();
console.log("Selected Lead Type:", selectedLeadType);
await leadTypeOptions.nth(randomLeadTypeIndex).click();
await page.waitForTimeout(2000);
await page.getByRole('button', { name: 'Save' }).waitFor();
await page.getByRole('button', { name: 'Save' }).click();

                                                      //Test Case for Address
await page.locator('.lucide.lucide-pencil').nth(5).click();
//   await page.keyboard.press('ControlOrMeta+A');
// await page.keyboard.press('Backspace');
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

//Test case for Assign Agent to team member 
  await page.locator('.lucide.lucide-pencil').nth(6).click();
  await page.getByRole('combobox').click();
  await page.getByLabel('Sahil Akbari').getByText('Sahil Akbari').click();
  await page.getByRole('button', { name: 'Save' }).click();

//Test case for City
  await page.locator('.lucide.lucide-pencil').nth(7).click();
  await page.getByRole('textbox', { name: 'Enter City' }).click();
  await page.getByRole('textbox', { name: 'Enter City' }).fill('Ontario');
  await page.getByRole('button', { name: 'Save' }).click();
await page.waitForTimeout(3000);

//Test case for Postal Code
   await page.locator('.lucide.lucide-pencil').nth(8).click();
  await page.getByRole('textbox', { name: 'Enter Postal Code' }).click();
  await page.getByRole('textbox', { name: 'Enter Postal Code' }).fill('L4B3B2');
  await page.getByRole('button', { name: 'Save' }).click();
await page.waitForTimeout(3000);

//Test case for Avg Property Price
   await page.locator('.lucide.lucide-pencil').nth(9).click();
  await page.getByRole('textbox', { name: 'Enter Avg Property Price' }).click();
  await page.getByRole('textbox', { name: 'Enter Avg Property Price' }).fill('20M');
  await page.getByRole('button', { name: 'Save' }).click();
await page.waitForTimeout(3000);

//Test case for Buy Area
  await page.locator('.lucide.lucide-pencil').nth(10).click();
  await page.getByRole('textbox', { name: 'Enter Buy Area' }).click();
  await page.getByRole('textbox', { name: 'Enter Buy Area' }).fill('Brampton');
  await page.getByRole('button', { name: 'Save' }).click();
await page.waitForTimeout(3000);

//Test case for Home Type
 await page.locator('.lucide.lucide-pencil').nth(11).click();
  await page.getByRole('textbox', { name: 'Enter Home Type' }).click();
  await page.getByRole('textbox', { name: 'Enter Home Type' }).fill('Codo');
  await page.getByRole('button', { name: 'Save' }).click();
await page.waitForTimeout(3000);

//Test case for Start Date
await page.locator('.lucide.lucide-pencil').nth(12).click();
  await page.getByRole('button', { name: 'Select Start Date' }).click();
  // Pick today's date (calendar day button)
  await page.locator('[role="gridcell"]:not([aria-disabled="true"])').first().click();
  // Click Save
  await page.getByRole('button', { name: 'Save' }).click();
//Test case for Assign Agent to team member 


//Delete This Lead
  await page.getByRole('button', { name: 'Delete lead' }).click();
  await page.getByRole('button', { name: 'Yes' }).click();
  await page.getByRole('button', { name: 'Yes, Confirm' }).click();





  // await page.locator('div').filter({ hasText: /^City:N\/A$/ }).getByRole('button').click();
  // await page.getByRole('textbox', { name: 'Enter City' }).click();
  // await page.getByRole('textbox', { name: 'Enter City' }).fill('jalagaon');
  // await page.getByRole('button', { name: 'Save' }).click();
  // await page.locator('div').filter({ hasText: /^Postal Code:N\/A$/ }).getByRole('button').click();
  // await page.getByRole('textbox', { name: 'Enter Postal Code' }).click();
  // await page.getByRole('textbox', { name: 'Enter Postal Code' }).fill('425116');
  // await page.getByRole('button', { name: 'Save' }).click();
  // await page.locator('div').filter({ hasText: /^Avg Property Price:N\/A$/ }).getByRole('button').click();
  // await page.getByRole('textbox', { name: 'Enter Avg Property Price' }).click();
  // await page.getByRole('textbox', { name: 'Enter Avg Property Price' }).fill('20000$');
  // await page.getByRole('button', { name: 'Save' }).click();
  // await page.locator('div').filter({ hasText: /^Buy Area:N\/A$/ }).getByRole('button').click();
  // await page.getByRole('textbox', { name: 'Enter Buy Area' }).click();
  // await page.getByRole('textbox', { name: 'Enter Buy Area' }).fill('Toronto');
  // await page.getByRole('button', { name: 'Save' }).click();
  // await page.locator('div').filter({ hasText: /^Home Type:N\/A$/ }).getByRole('button').click();
  // await page.getByRole('textbox', { name: 'Enter Home Type' }).click();
  // await page.getByRole('textbox', { name: 'Enter Home Type' }).fill('Condo');
  // await page.getByRole('button', { name: 'Save' }).click();
  // await page.locator('div').filter({ hasText: /^Start Date:N\/A$/ }).getByRole('button').click();
  // await page.getByRole('button', { name: 'Select Start Date' }).click();
  // await page.getByRole('button', { name: 'Wednesday, April 1st,' }).click();
  // await page.getByRole('button', { name: 'Save' }).click();
  // await page.locator('div').filter({ hasText: /^Last Contact Date:N\/A$/ }).getByRole('button').click();
  // await page.getByRole('button', { name: 'Enter Last Contact Date' }).click();
  // await page.getByRole('button', { name: 'Thursday, April 2nd,' }).click();
  // await page.getByRole('button', { name: 'Save' }).click();
  // await page.locator('div').filter({ hasText: /^Province:N\/A$/ }).getByRole('button').click();
  // await page.getByRole('textbox', { name: 'Enter Province' }).click();
  // await page.getByRole('textbox', { name: 'Enter Province' }).fill('Brampton');
  // await page.getByRole('button', { name: 'Save' }).click();
  // await page.locator('div').filter({ hasText: /^Timeframe:N\/A$/ }).getByRole('button').click();
  // await page.getByRole('textbox', { name: 'Enter Timeframe' }).click();
  // await page.getByRole('textbox', { name: 'Enter Timeframe' }).fill('2 months');
  // await page.getByRole('button', { name: 'Save' }).click();
  // await page.locator('div').filter({ hasText: /^Urgency:N\/A$/ }).getByRole('button').click();
  // await page.getByRole('textbox', { name: 'Enter Urgency' }).click();
  // await page.getByRole('textbox', { name: 'Enter Urgency' }).fill('Hogh');
  // await page.getByRole('textbox', { name: 'Enter Urgency' }).press('ArrowLeft');
  // await page.getByRole('textbox', { name: 'Enter Urgency' }).press('ArrowLeft');
  // await page.getByRole('textbox', { name: 'Enter Urgency' }).press('ArrowLeft');
  // await page.getByRole('textbox', { name: 'Enter Urgency' }).press('ArrowRight');
  // await page.getByRole('textbox', { name: 'Enter Urgency' }).fill('High');
  // await page.getByRole('button', { name: 'Save' }).click();
  // await page.locator('div').filter({ hasText: /^Birthday:N\/A$/ }).getByRole('button').click();
  // await page.getByRole('button', { name: 'Enter Birthday' }).click();
  // await page.getByRole('button', { name: '1995' }).click();
  // await page.getByRole('button', { name: 'Jun' }).click();
  // await page.getByRole('button', { name: 'Wednesday, June 7th,' }).click();
  // await page.getByRole('button', { name: 'Save' }).click();
  // await page.locator('div').filter({ hasText: /^Anniversary:N\/A$/ }).getByRole('button').click();
  // await page.getByRole('button', { name: 'Enter Anniversary' }).click();
  // await page.getByRole('button', { name: 'Tuesday, April 7th,' }).click();
  // await page.getByRole('button', { name: 'Save' }).click();
});