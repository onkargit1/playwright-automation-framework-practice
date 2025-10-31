import { CommonMethods } from '../utils/commonMethods.js';
import { loadConfig } from '../utils/configLoader.js';
import { constant } from '../utils/constant.js';
import { LoginPage } from '../pages/login.page.js';
import { DashboardPage } from '../pages/dashboard.js';

const config = loadConfig();

const { test, expect } = require('@playwright/test');

test('form fill orangeHRM', async ({ page }) => {

    const commonMethod = new CommonMethods(page);
    const login = new LoginPage(page);
    const dashboard = new DashboardPage(page);

    await login.navigateTo(config.baseURL);
    await commonMethod.waitForElement(login.username, 5000);
   await login.login(config.username, config.password);
   await expect(page).toHaveTitle(constant.homepageTitle);
   expect( await commonMethod.getText(dashboard.pageheading)).toBe(constant.homepageHeading);

    await commonMethod.waitAndClick(dashboard.myInfo);

    const firstName = await page.getByPlaceholder('First Name')
    await firstName.waitFor({state:'visible'})
    await firstName.fill('');
    await firstName.fill('John');
    const middleName = await page.getByPlaceholder('Middle Name');
    await middleName.clear();
    await middleName.fill('A.');
    await page.getByPlaceholder('Last Name').clear();
    await page.getByPlaceholder('Last Name').fill('weak');

    // Validate that output fields contain the same values
    // const name = await page.locator('#name').textContent();
    // expect(name).toContain('Onkar');


    // Handling Dropdowns (Select & Custom)
    // Standard <select> dropdown
    // await page.selectOption('#oldSelectMenu', '2');
    // Custom dropdowns: For React-based or dynamic dropdowns:
    
    // await page.locator("//div[@class='oxd-select-text oxd-select-text--active']").nth(0).click();
    // // await page.getByText('American',{exact:true}).click();
    // await page.waitForTimeout(5000);
    
    // Handling Checkboxes & Radio Buttons
    await page.getByText('Male',{exact:true}).check();

    await commonMethod.waitAndClick(dashboard.saveButton.nth(0));

    expect(await commonMethod.getText(dashboard.successMessage)).toBe(constant.saveSuccessMessage);

 });
 