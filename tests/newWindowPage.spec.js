const { test, expect } = require('@playwright/test');

test('Handle new tab', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://demoqa.com/browser-windows');

      // Listen for new page (tab)
      const [newPage] = await Promise.all([

        context.waitForEvent('page'),
        page.click('#tabButton') // open new tab
      ])

      await newPage.waitForLoadState();
      console.log(await newPage.textContent('h1'));
      const text = await newPage.textContent('h1');
      await expect(text).toMatch('This is a sample page');
    
      // Each new tab is treated as a separate Page inside the same Context.
});

test('Handle iframe', async ({ page }) =>{

    await page.goto('https://the-internet.herokuapp.com/iframe');
    
    const frame =  page.frame({url : /iframe/}); //or by name/title
    await frame.locator("//body[@id='tinymce']//p").textContent();
    const text = await frame.textContent('#tinymce');

    expect(text).toBe('Typing inside iframe');

    // Use page.frames() to list all frames and inspect their URLs or names.
});

// Alert Example

test('Alert example', async ({page}) => {

    await page.goto('https://demoqa.com/alerts');

    // Listen for alert
    page.once('dialog', async dialog =>{

        console.log(dialog.message());
        await dialog.accept(); // dialog dismiss()
    });

    await page.click('#alertButton');

    // Confirm Example

    page.once('dialog', async dialog =>{
        console.log(dialog.message());
        await dialog.dismiss(); // dissmiss for cancel
    });
    await page.click('#confirmButton');

    // Prompt Example
    page.once('dialog', async dialog => {
        await dialog.accept('Playwright Rocks!');
      });
      await page.click('#promtButton');
          
});