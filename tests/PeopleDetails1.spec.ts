import { test, expect, Page } from '@playwright/test';

let page: Page;

test.describe.serial('Dashboard Tests', () => {

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();

  await page.goto('https://app.novacrm.ca/');
   await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('lokesh@mmnovatech.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('1234567890');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForURL('**/dashboard');
  await page.context().storageState({ path: 'auth.json' });
  await page.goto('https://v2.novacrm.ca/people');
});
//1 Create Lead
test('1 Create Lead', async () => {
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
});
//2 Search Lead
test('2 Search Lead', async () => {
  await page.waitForURL('**/people');
  await page.locator('tbody').waitFor();
  // find correct row using email + phone
   await page.locator('tbody').waitFor();
  // find row using email
  const TestData = page.locator('tbody tr', {
    has: page.getByText('lokesh@mmnovatech.com')
  });
  await expect(TestData).toBeVisible();
  await page.waitForTimeout(2000);
  // click first name (Lokesh)
  await TestData.locator('.text-sky-600').first().click();
   await page.waitForTimeout(2000);

//Step 2: Details verification +CRUD
  await page.locator('span:has-text("Phone:")')
  .locator('xpath=ancestor::div[1]')
  .locator('button')
  .click();
  await page.waitForTimeout(1000);
});
//3 Phone CRUD
test('3 Phone CRUD', async () => {
  await page.getByRole('button', { name: 'Add another phone number' }).click();
  await page.locator('select').nth(1).selectOption('+91');
  await page.locator('input[name="phones.1.value"]').fill('9930010201');
  await page.getByRole('button', { name: 'Save' }).click();
  await page.locator('div').filter({ hasText: /^Phone:\+918421020309Default\+919930010201$/ }).getByRole('button').click();
  await page.locator('form').getByRole('button').nth(1).click();
  await page.getByRole('button', { name: 'Save' }).click();
});
//4 Email CRUD
test('4 Email CRUD', async () => {
  await page.locator('div').filter({ hasText: /^Email:Lokesh@mmnovatech\.comDefault$/ }).getByRole('button').click();
  await page.getByRole('button', { name: 'Add another email' }).click();
  await page.locator('input[name="emails.1.value"]').click();
  await page.locator('input[name="emails.1.value"]').fill('Lokesh+1@mmnovatech.com');
  await page.getByRole('button', { name: 'Save' }).click();
  await page.locator('div').filter({ hasText: /^Email:Lokesh@mmnovatech\.comDefaultLokesh\+1@mmnovatech\.com$/ }).getByRole('button').click();
  await page.locator('form').getByRole('button').nth(1).click();
  await page.getByRole('button', { name: 'Save' }).click();
});
//5 Source
test('5 Source Dropdown', async () => {
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
});
//6 Lead Type
test('6 Lead Type', async () => {
  // await page.locator('.lucide.lucide-pencil').nth(4).click();                                                
  // await page.locator('#leadType').click();
  // const leadTypeOptions = page.getByRole('option');
  // const leadTypeCount = await leadTypeOptions.count();
  // const randomLeadTypeIndex = Math.floor(Math.random() * leadTypeCount);
  // const selectedLeadType = await leadTypeOptions.nth(randomLeadTypeIndex).textContent();
  // console.log("Selected Lead Type:", selectedLeadType);
  // await leadTypeOptions.nth(randomLeadTypeIndex).click();
  // await page.waitForTimeout(2000);
  // await page.getByRole('button', { name: 'Save' }).waitFor();
  // await page.getByRole('button', { name: 'Save' }).click();


   await page.locator('.lucide.lucide-pencil').nth(4).click();                                                
  await page.locator('#leadType').click();
  const leadTypeOptions = page.getByRole('option');
  const leadTypeCount = await leadTypeOptions.count();
  // collect options except Seller
const filteredIndexes: number[] = [];
for (let i = 0; i < leadTypeCount; i++) {
  const text = await leadTypeOptions.nth(i).textContent();
  if (text?.trim() !== 'Seller') {
    filteredIndexes.push(i);
  }
}
  const randomLeadTypeIndex = Math.floor(Math.random() * leadTypeCount);
  const selectedLeadType = await leadTypeOptions.nth(randomLeadTypeIndex).textContent();
  console.log("Selected Lead Type:", selectedLeadType);
  await leadTypeOptions.nth(randomLeadTypeIndex).click();
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'Save' }).waitFor();
  await page.getByRole('button', { name: 'Save' }).click();
  await page.waitForTimeout(2000);
});
//7 Address
test('7 Address', async () => {
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
  await page.waitForTimeout(2000);
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
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'Save' }).click();
  await page.waitForTimeout(2000);
});
//8 Assign Agent
test('8 Assign Agent', async () => {
  await page.locator('.lucide.lucide-pencil').nth(6).click();
  await page.getByRole('combobox').click();
  await page.getByLabel('Sahil Akbari').getByText('Sahil Akbari').click();
//   const agentOptions = page.locator('div[role="option"]');

// const agentCount = await agentOptions.count();
// console.log("Total Agent Options:", agentCount);

// for (let i = 0; i < agentCount; i++) {
//   const optionText = await agentOptions.nth(i).textContent();
//   console.log(`Agent Option ${i}:`, optionText);
// }

// const randomAgentIndex = Math.floor(Math.random() * agentCount);
// console.log("Random Index Selected:", randomAgentIndex);

// const selectedAgent = await agentOptions
//   .nth(randomAgentIndex)
//   .textContent();

// console.log("Selected Agent:", selectedAgent);

// await agentOptions.nth(randomAgentIndex).click();
   await page.getByRole('button', { name: 'Save' }).click();
});
//9 City
test('9 City', async () => {
  await page.locator('.lucide.lucide-pencil').nth(7).click();
  await page.getByRole('textbox', { name: 'Enter City' }).click();
  await page.getByRole('textbox', { name: 'Enter City' }).fill('Ontario');
  await page.getByRole('button', { name: 'Save' }).click();
  await page.waitForTimeout(3000);
});
//10 Postal Code
test('10 Postal Code', async () => {
  await page.locator('.lucide.lucide-pencil').nth(8).click();
  await page.getByRole('textbox', { name: 'Enter Postal Code' }).click();
  await page.getByRole('textbox', { name: 'Enter Postal Code' }).fill('L4B3B2');
  await page.getByRole('button', { name: 'Save' }).click();
  await page.waitForTimeout(3000);
});
//11 Avg Property Price
test('11 Avg Property Price', async () => {
  await page.locator('.lucide.lucide-pencil').nth(9).click();
  await page.getByRole('textbox', { name: 'Enter Avg Property Price' }).click();
  await page.getByRole('textbox', { name: 'Enter Avg Property Price' }).fill('2000000');
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Save' }).click();
  await page.waitForTimeout(3000);
});
//12 Buy Area
test('12 Buy Area', async () => {
  await page.locator('.lucide.lucide-pencil').nth(10).click();
  await page.getByRole('textbox', { name: 'Enter Buy Area' }).click();
  await page.getByRole('textbox', { name: 'Enter Buy Area' }).fill('Brampton');
  await page.getByRole('button', { name: 'Save' }).click();
  await page.waitForTimeout(3000);
});
//13 Home Type
test('13 Home Type', async () => {
    await page.locator('.lucide.lucide-pencil').nth(11).click();
  await page.getByRole('textbox', { name: 'Enter Home Type' }).click();
  await page.getByRole('textbox', { name: 'Enter Home Type' }).fill('Condo');
  await page.getByRole('button', { name: 'Save' }).click();
  await page.waitForTimeout(3000);
});
//14 Start Date
test('14 Start Date', async () => {
   await page.locator('.lucide.lucide-pencil').nth(12).click();
  await page.getByRole('button', { name: 'Select Start Date' }).click();
  // Pick today's date (calendar day button)
  await page.locator('[role="gridcell"]:not([aria-disabled="true"])').first().click();
  // Click Save
  await page.getByRole('button', { name: 'Save' }).click();
  await page.waitForTimeout(2000);
});
//15 Last Contact Date
test('15 Last Contact Date', async () => {
  await page.locator('.lucide.lucide-pencil').nth(13).click();
   const calendar = page.locator('.rdp-root');
  await calendar.waitFor();
  // ---------------- RANDOM MONTH ----------------
  const monthDropdown = calendar.getByRole('combobox').first();
  await monthDropdown.click();
  const months = page.locator('[role="option"]');
  const monthCount = await months.count();
  const randomMonth = Math.floor(Math.random() * monthCount);
  const monthText = await months.nth(randomMonth).innerText();
  await months.nth(randomMonth).click();
  // ---------------- RANDOM YEAR ----------------
  const yearDropdown = calendar.getByRole('combobox').nth(1);
  await yearDropdown.click();
  const years = page.locator('[role="option"]');
  const yearCount = await years.count();
  const randomYear = Math.floor(Math.random() * yearCount);
  const yearText = await years.nth(randomYear).innerText();
  await years.nth(randomYear).click();
  // ---------------- RANDOM DATE ----------------
  const dates = calendar.locator('.rdp-day:not(.rdp-day_disabled)');
  const dateCount = await dates.count();
  const randomDate = Math.floor(Math.random() * dateCount);
  const dateText = await dates.nth(randomDate).innerText();
  await dates.nth(randomDate).click();
  // ---------------- PRINT SELECTED DATE ----------------
  console.log(`Selected Date for Last Contact Date: ${dateText} ${monthText} ${yearText}`);
  // ---------------- CLICK SAVE ----------------
  const saveBtn = page.getByRole('button', { name: 'Save' });
  await expect(saveBtn).toBeEnabled();
  await saveBtn.click();
  await page.waitForTimeout(2000);
});
//16 Province
test('16 Province', async () => {
  await page.locator('.lucide.lucide-pencil').nth(14).click();
  await page.getByRole('textbox', { name: 'Enter Province' }).click();
  await page.getByRole('textbox', { name: 'Enter Province' }).fill('Brampton');
  await page.getByRole('button', { name: 'Save' }).click();
  await page.waitForTimeout(3000);

});
//17 Timeframe
test('17 Timeframe', async () => {
  await page.locator('.lucide.lucide-pencil').nth(15).click();
  await page.getByRole('textbox', { name: 'Enter Timeframe' }).click();
  await page.getByRole('textbox', { name: 'Enter Timeframe' }).fill('4 months');
  await page.getByRole('button', { name: 'Save' }).click();
  await page.waitForTimeout(3000);

});
//18 Urgency
test('18 Urgency', async () => {
  await page.locator('.lucide.lucide-pencil').nth(16).click();
  await page.getByRole('textbox', { name: 'Enter Urgency' }).click();
  await page.getByRole('textbox', { name: 'Enter Urgency' }).fill('High');
  await page.getByRole('button', { name: 'Save' }).click();
  await page.waitForTimeout(3000);
});
//Is Realtor?
test('19 Is realtor?', async () => {
//Is Realtor button Validation
  await page.locator('section').filter({ hasText: /^Is this lead a Realtor\?$/ }).getByRole('button').nth(1).click();
  await page.waitForTimeout(2000);
  await page.locator('section').filter({ hasText: /^Is this lead a Realtor\?$/ }).getByRole('button').first().click();
  await page.waitForTimeout(3000);
  });

//19 Social Profile
test('19 Social Profile', async () => {
  await page.getByRole('heading', { name: 'Social Profile' }).locator('svg').click();
  await page.getByRole('textbox', { name: 'Instagram profile URL' }).click();
  await page.getByRole('textbox', { name: 'Instagram profile URL' }).fill('instagram.com');
  await page.getByRole('textbox', { name: 'Facebook profile URL' }).click();
  await page.getByRole('textbox', { name: 'Facebook profile URL' }).fill('Facebook.com');
  await page.getByRole('textbox', { name: 'Twitter profile URL' }).click();
  await page.getByRole('textbox', { name: 'Twitter profile URL' }).fill('Twitter.com');
  await page.getByRole('button', { name: 'Save' }).click();
  await page.waitForTimeout(2000);
});
//20 Custom Lead Data
test('20 Custom Lead Data', async () => {
  await page.getByText('Custom Lead Data').click();

 //Morgage type of Custom data 
await page
  .locator('div')
  .filter({ hasText: /^Mortgage typeSelect$/ })
  .getByRole('combobox')
  .click();
await page.locator('div[role="option"]').first().waitFor();
const mortgageOptions = page.locator('div[role="option"]');
const optionCount = await mortgageOptions.count();
console.log("Total Mortgage Options:", optionCount);
for (let i = 0; i < optionCount; i++)
   {
  const text = await mortgageOptions.nth(i).textContent();
  console.log(`Option ${i}:`, text);
  }
const RI = Math.floor(Math.random() * optionCount);
console.log("Random Index Selected:", RI);
const selectedMortgage = await mortgageOptions.nth(RI).textContent();
console.log("Selected Mortgage Type:", selectedMortgage);
await mortgageOptions.nth(RI).click();


//Morgage Status of Custom data 
 page.locator('div').filter({ hasText: /^Mortgage StatusSelect$/ }).getByRole('combobox').click();
// wait for options
await page.locator('div[role="option"]').first().waitFor();
const mortgageStatusOptions = page.locator('div[role="option"]');
const mortgageStatusCount = await mortgageStatusOptions.count();
console.log("Total Mortgage Status Options:", mortgageStatusCount);
for (let i = 0; i < mortgageStatusCount; i++) {
  const text = await mortgageStatusOptions.nth(i).textContent();
  console.log(`Option ${i}:`, text);
}
const RI2 = Math.floor(Math.random() * mortgageStatusCount);
console.log("Random Index Selected:", RI2);
const selectedMortgageStatus = await mortgageStatusOptions.nth(RI2).textContent();
console.log("Selected Mortgage Status:", selectedMortgageStatus);
await mortgageStatusOptions.nth(RI2).click();


// open Lead Rating dropdown
await page.locator('div').filter({ hasText: /^Lead RatingSelect$/ }).getByRole('combobox').click();
await page.locator('div[role="option"]').first().waitFor();
const leadRatingOptions = page.locator('div[role="option"]');
const leadRatingCount = await leadRatingOptions.count();
console.log("Total Lead Rating Options:", leadRatingCount);
// print all options
for (let i = 0; i < leadRatingCount; i++) 
  {
  const text = await leadRatingOptions.nth(i).textContent();
  console.log(`Lead Rating Option ${i}:`, text);
  }
const RI3 =Math.floor(Math.random() * leadRatingCount);
console.log("Random Index Selected:", RI3);
const selectedLeadRating =
  await leadRatingOptions.nth(RI3).textContent();
console.log("Selected Lead Rating:", selectedLeadRating);
await leadRatingOptions.nth(RI3).click();

//Selling in of Custom data 
await page.locator('div').filter({ hasText: /^Selling inSelect$/ }).getByRole('combobox').click();
await page.locator('div[role="option"]').first().waitFor();
const sellingInOptions = page.locator('div[role="option"]');
const sellingInCount = await sellingInOptions.count();
console.log("Total Selling In Options:", sellingInCount);
for (let i = 0; i < sellingInCount; i++)
   {
const text = await sellingInOptions.nth(i).textContent();
  console.log(`Option ${i}:`, text);
   }
const RI0 =
Math.floor(Math.random() * sellingInCount);
console.log("Random Index Selected:", RI0);
const selectedSellingIn =
await sellingInOptions.nth(RI0).textContent();
console.log("Selected Selling In:", selectedSellingIn);
await sellingInOptions.nth(RI0).click();


//Purchased Anniversary of Custom data 
//Wedding Anniversary of Custom data 

//Relgion of Custom data 
await page.locator('input[name="religion"]').fill('Christian');

//Main Agent of Custom data 
await page.locator('input[name="main_agent"]').fill('Lokesh');

//Mortgage Agent of Custom data 
await page.locator('input[name="mortgage_agent"]').fill('Sahil');

//List Agent of Custom data 
await page.locator('input[name="list_agent"]').fill('Sahil');

//Area of Interest of Custom data 
await page.locator('input[name="area_of_interest"]').fill('Brampton');

//Parking type of Custom data
await page.locator('div').filter({ hasText: /^Parking TypeSelect$/ }).getByRole('combobox').click();
await page.locator('div[role="option"]').first().waitFor();
const parkingTypeOptions = page.locator('div[role="option"]');
const parkingTypeCount = await parkingTypeOptions.count();
console.log("Total Parking Type Options:", parkingTypeCount);
for (let i = 0; i < parkingTypeCount; i++) 
  {
  const text = await parkingTypeOptions.nth(i).textContent();
  console.log(`Parking Type Option ${i}:`, text);
  }
const RI4 = Math.floor(Math.random() * parkingTypeCount);
console.log("Random Index Selected:", RI4);
const selectedParkingType =
  await parkingTypeOptions.nth(RI4).textContent();
console.log("Selected Parking Type:", selectedParkingType);
await parkingTypeOptions.nth(RI4).click();

//Planning to sell of Custom data 
await page.locator('input[name="planning_to_sell"]').fill('2 months');

//Listing Status of Custom data
await page.locator('div').filter({ hasText: /^Listing StatusSelect$/ }).getByRole('combobox').click();
await page.locator('div[role="option"]').first().waitFor();
const listingStatusOptions = page.locator('div[role="option"]');
const listingStatusCount = await listingStatusOptions.count();
console.log("Total Listing Status Options:", listingStatusCount);
for (let i = 0; i < listingStatusCount; i++) 
{
  const optionText = await listingStatusOptions.nth(i).textContent();
  console.log(`Listing Status Option ${i}:`, optionText);
}
const randomListingStatusIndex = Math.floor(Math.random() * listingStatusCount);
console.log("Random Index Selected:", randomListingStatusIndex);
const selectedListingStatus =
await listingStatusOptions.nth(randomListingStatusIndex).textContent();
console.log("Selected Listing Status:", selectedListingStatus);
await listingStatusOptions.nth(randomListingStatusIndex).click();

//Basement of custome data
await page.locator('div').filter({ hasText: /^BasementSelect$/ }).getByRole('combobox').click();
await page.locator('div[role="option"]').first().waitFor();
const basementOptions = page.locator('div[role="option"]');
const basementCount = await basementOptions.count();
console.log("Total Basement Options:", basementCount);
for (let i = 0; i < basementCount; i++)
{
  const optionText = await basementOptions.nth(i).textContent();
  console.log(`Basement Option ${i}:`, optionText);
}
const randomBasementIndex = Math.floor(Math.random() * basementCount);
console.log("Random Index Selected:", randomBasementIndex);
const selectedBasement =
await basementOptions.nth(randomBasementIndex).textContent();
console.log("Selected Basement:", selectedBasement);
await basementOptions.nth(randomBasementIndex).click();

//Parking dropdown of custom data
await page.locator('div').filter({ hasText: /^ParkingSelect$/ }).getByRole('combobox').click();
await page.locator('div[role="option"]').first().waitFor();
const parkingDropdownOptions = page.locator('div[role="option"]');
const parkingDropdownCount = await parkingDropdownOptions.count();
console.log("Total Parking Options:", parkingDropdownCount);
 for (let i = 0; i < parkingDropdownCount; i++)
   {
  const optionText = await parkingDropdownOptions.nth(i).textContent();
  console.log(`Parking Option ${i}:`, optionText);
   }
const randomParkingIndex = Math.floor(Math.random() * parkingDropdownCount);
console.log("Random Index Selected:", randomParkingIndex);
const selectedParkingOption =
await parkingDropdownOptions.nth(randomParkingIndex).textContent();
console.log("Selected Parking:", selectedParkingOption);
await parkingDropdownOptions.nth(randomParkingIndex).click();

// save
await page.getByRole('button', { name: 'Save' }).click();
await page.waitForTimeout(3000);
});
test('21 Update stages ', async () => {
const dropdown = page.locator(
  'div.flex.items-center.gap-5.overflow-x-auto'
);

const gatewayOptions = dropdown.locator(
  'div.cursor-pointer'
);

const count = await gatewayOptions.count();
console.log("Total Options:", count);

const randomIndex = Math.floor(Math.random() * count);

await gatewayOptions.nth(randomIndex).click();
await page.waitForTimeout(2000);
  });
//22 Task Creation
test('22 Task Creation', async () => {
   await page.getByText('Tasks and Appointments').click();
  await page.getByRole('button', { name: 'Add New' }).click();
  await page.getByPlaceholder('Enter task title').fill('Test Task');
  await selectRandomDropdown(page, 'Select type');
  await selectRandomDropdown(page, 'Select time');
  await page.getByRole('button', { name: 'Create' }).click();
  await page.waitForTimeout(2000);

});
//22 Appointment
test('22 Appointment', async () => {
  await page.getByRole('tab', { name: 'Appointments' }).click();
  await page.getByRole('button', { name: 'Add New' }).click();
  await page.getByPlaceholder('Appointment title').fill('Test Appointment');
  await page.getByPlaceholder('Location').fill('Mumbai');
  await selectRandomDropdown(page, 'Type');
  await selectRandomDropdown(page, 'Start time');
  await page.getByPlaceholder('description').fill('Test Appointment');
  await page.getByRole('button', { name: 'Create' }).click();
  await page.waitForTimeout(2000);
});
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
