const { test, expect } = require('@playwright/test');
import { loadConfig } from '../utils/configLoader.js';
import { LoginPage } from '../pages/login.page.js';
import { CommonMethods } from '../utils/commonMethods.js';
import { DashboardPage } from '../pages/dashboard.js';
import { constant } from '../utils/constant.js';
import { label, description, link, step ,attachment} from 'allure-js-commons';
import  fs  from 'fs'

const config = loadConfig();

const data = fs.readFileSync('./utils/testData.json', 'utf-8'); // read file
const parseData = JSON.parse(data); // convert to JSON object



test('log in to orageHRM', async ({ page }) => {

   const login = new LoginPage(page);
   const dashboard = new DashboardPage(page);
   const commonMethod = new CommonMethods(page);

   console.log(parseData.name); // print json data

   try{
     await step("Navigate to login page", async ()=>{
      await login.navigateTo(config.baseURL);
      })
      
      await step("Enter Credetials", async()=>{
         await commonMethod.waitForElement(login.username, 5000);
         await login.login(config.username, config.password);
      })

      await step("Validate page title and heading", async()=>{
         await expect(page).toHaveTitle(constant.homepageTitle);
         expect( await commonMethod.getText(dashboard.pageheading)).toBe(constant.homepageHeading);
      // await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
      })
      
} catch (error) {
   // Capture screenshot on failure and attach it to Allure report
   const screenshot = await page.screenshot();
   await attachment('Failure Screenshot', screenshot, 'image/png');

   // Optionally log error message to Allure
   await attachment('Error Message', error.message, 'text/plain');
   throw error;
 }
});



