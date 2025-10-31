import fs from 'fs';

export class CommonMethods {
  /**
   * 
   * @param {import('@playwright/test').Page} page 
   */
  constructor(page) {
    this.page = page;
  }

  async waitForElement(locator, timeout = 5000) {
    await locator.waitFor({ state: 'visible', timeout });
  }

  async takeScreenshot(fileName = 'screenshot.png') {
    await this.page.screenshot({ path: `reports/screenshots/${fileName}`, fullPage: true });
  }

  static readJsonFile(filePath) {
    const rawData = fs.readFileSync(filePath);
    return JSON.parse(rawData);
  }

  async waitAndClick(locator, timeout = 5000) {
    await this.waitForElement(locator, timeout);
    await locator.click();
  }

  async waitAndFill(locator, text, timeout = 5000) {
    await this.waitForElement(locator, timeout);
    await locator.fill(text);
  }
  /**
   * 
   * @param {import('@playwright/test').Locator} locator 
   * @returns 
   */
  async getText(locator){
    await this.waitForElement(locator,5000);
    let text = await locator.textContent();
    return text.trim();
  }
}
