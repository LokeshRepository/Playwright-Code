import { test, expect, Page } from '@playwright/test';

test('1. Dashboard Redirection checking', async ({ page }) => {
  await page.goto('https://app.novacrm.ca/');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('Lokesh@mmnovatech.com');
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
  await page.getByRole('textbox', { name: 'Enter Avg Property Price' }).fill('2000000');
  await page.waitForTimeout(3000);
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
  await page.getByRole('textbox', { name: 'Enter Home Type' }).fill('Condo');
  await page.getByRole('button', { name: 'Save' }).click();
  await page.waitForTimeout(3000);

                                          //Test case for Start Date
  await page.locator('.lucide.lucide-pencil').nth(12).click();
  await page.getByRole('button', { name: 'Select Start Date' }).click();
  // Pick today's date (calendar day button)
  await page.locator('[role="gridcell"]:not([aria-disabled="true"])').first().click();
  // Click Save
  await page.getByRole('button', { name: 'Save' }).click();


                  //Test case for Last Contact Date 
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
 
                                        //Test case for Provience
  await page.locator('.lucide.lucide-pencil').nth(14).click();
  await page.getByRole('textbox', { name: 'Enter Province' }).click();
  await page.getByRole('textbox', { name: 'Enter Province' }).fill('Brampton');
  await page.getByRole('button', { name: 'Save' }).click();
  await page.waitForTimeout(3000);

                              //Test case for Timeframe
  await page.locator('.lucide.lucide-pencil').nth(15).click();
  await page.getByRole('textbox', { name: 'Enter Timeframe' }).click();
  await page.getByRole('textbox', { name: 'Enter Timeframe' }).fill('4 months');
  await page.getByRole('button', { name: 'Save' }).click();
  await page.waitForTimeout(3000);

      //Test case for Urgency
  await page.locator('.lucide.lucide-pencil').nth(16).click();
  await page.getByRole('textbox', { name: 'Enter Urgency' }).click();
  await page.getByRole('textbox', { name: 'Enter Urgency' }).fill('High');
  await page.getByRole('button', { name: 'Save' }).click();
  await page.waitForTimeout(3000);

                                

  //Is Realtor button Validation
  await page.locator('section').filter({ hasText: /^Is this lead a Realtor\?$/ }).getByRole('button').nth(1).click();
  await page.locator('section').filter({ hasText: /^Is this lead a Realtor\?$/ }).getByRole('button').first().click();


                                        //Test case Social media Link Section
  await page.getByRole('heading', { name: 'Social Profile' }).locator('svg').click();
  await page.getByRole('textbox', { name: 'Instagram profile URL' }).click();
  await page.getByRole('textbox', { name: 'Instagram profile URL' }).fill('instagram.com');
  await page.getByRole('textbox', { name: 'Facebook profile URL' }).click();
  await page.getByRole('textbox', { name: 'Facebook profile URL' }).fill('Facebook.com');
  await page.getByRole('textbox', { name: 'Twitter profile URL' }).click();
  await page.getByRole('textbox', { name: 'Twitter profile URL' }).fill('Twitter.com');
  await page.getByRole('button', { name: 'Save' }).click();

  //Test for Custom Lead data
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


// save
await page.getByRole('button', { name: 'Save' }).click();


//Task
  await page.getByText('Tasks and Appointments').click();
  await page.getByRole('button', { name: 'Add New' }).click();
  await page.getByPlaceholder('Enter task title').fill('Test Task');
  await selectRandomDropdown(page, 'Select type');
  await selectRandomDropdown(page, 'Select time');
  await page.getByRole('button', { name: 'Create' }).click();

// Appointments 
   await page.getByRole('tab', { name: 'Appointments' }).click();
  await page.getByRole('button', { name: 'Add New' }).click();
  await page.getByPlaceholder('Appointment title').fill('Test Appointment');
  await page.getByPlaceholder('Location').fill('Mumbai');
  await selectRandomDropdown(page, 'Type');
  await selectRandomDropdown(page, 'Start time');
  await page.getByPlaceholder('description').fill('Test Appointment');
  await page.getByRole('button', { name: 'Create' }).click();
  await page.waitForTimeout(1000);

  
  //                //Delete This Lead
  // await page.getByRole('button', { name: 'Delete lead' }).click();
  // await page.getByRole('button', { name: 'Yes' }).click();
  // await page.getByRole('button', { name: 'Yes, Confirm' }).click();
  

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

