import { BasePage } from './base.page.js';

export class LoginPage extends BasePage {

    constructor(page){
        super(page)
        this.username = page.getByPlaceholder("Username");
        this.password = page.getByPlaceholder("Password");
        this.loginButton = page.getByRole('button', {name: ' Login '});
    }

    async login(user, pass)
    {
      await this.username.fill(user);
      await this.password.fill(pass);
      await this.loginButton.click();
    }
}