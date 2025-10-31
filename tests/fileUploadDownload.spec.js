const { test, expect } = require('@playwright/test');

test('file upload', async ({ page }) => {

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.getByPlaceholder("Username").fill('Admin');
    await page.getByPlaceholder("Password").fill("admin123");
    await page.getByRole('button', {name: ' Login '}).click();
    await expect(page).toHaveTitle('OrangeHRM');

    await page.click("//span[text() ='My Info']");
    const profile = await page.getByAltText("profile picture");
    await profile.nth(1).click();
    await page.setInputFiles('//input[@type="file"]','tests/files/profiledownload.png');

    // you can use multiple files
    // await page.setInputFiles('#file-upload', ['file1.txt', 'file2.txt']);

});

test('file dowload', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/download');
    const [downlaod] = await Promise.all([
        page.waitForEvent('download'),
        page.click('//a[text()="tmpbk1ukgmf.txt"]')
    ]);

    const path = await downlaod.path();
    console.log('Download file path:', path);
});

//Keyboard and Mouse Actions

// Keyboard

// await page.click('#username');
// await page.keyboard.type('Playwright Rocks!');
// await page.keyboard.press('Tab');

// Mouse

// await page.mouse.move(100, 100);
// await page.mouse.down();
// await page.mouse.up();

