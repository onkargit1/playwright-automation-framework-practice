const { test, expect } = require('@playwright/test');

test('Verify Google page title', async ({ page }) => {
  await page.goto('https://www.google.com');
  await expect(page).toHaveTitle(/Google/);
});

test('Verify Serveymonkey page title', async ({ page }) =>{

    await page.goto('https://www.surveymonkey.com/');
    await expect(page).toHaveTitle(/SurveyMonkey: The World’s Most Popular Survey Platform/);
});


