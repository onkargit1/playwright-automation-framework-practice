import { BasePage } from './base.page.js';

export class DashboardPage extends BasePage {
    /**
     * 
     * @param {import('@playwright/test').Page } page 
     */

    constructor(page){
        super(page)
        this.pageheading = page.locator("//h6[text()='Dashboard']");  
        this.myInfo = page.locator("//span[text() ='My Info']");
        this.saveButton = page.getByRole('button', {name: ' Save '});
        this.successMessage = page.getByText('Successfully Updated');
    }

}