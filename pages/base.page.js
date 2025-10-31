
export class BasePage {
    
    constructor(page) {
        this.page = page;
    }

    async navigateTo(url){
        await this.page.goto(url);
    }

    async click(element) {
        await element.click();
      }
    
      async fill(element, text) {
        await element.fill(text);
      }
    
      async getText(element) {
        return await element.textContent();
      }
    
}