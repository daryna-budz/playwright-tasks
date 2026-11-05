import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly username: Locator;
    readonly password: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page){
        this.page = page;
        this.username = page.getByPlaceholder("Username");
        this.password = page.getByPlaceholder("Password");
        this.loginButton = page.getByRole("button");
        this.errorMessage = page.getByTestId('error');
    }

    async goto(){
        await this.page.goto("https://www.saucedemo.com/");
    }

    async login(name: string, password: string){
        await this.username.fill(name);
        await this.password.fill(password);
        await this.loginButton.click();
    }
}