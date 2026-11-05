import { expect, type Locator, type Page } from '@playwright/test';

export class InventoryPage {
    readonly page: Page;
    readonly sortDropdown: Locator;
    readonly itemPrices: Locator;
    readonly cartBadge: Locator;
    readonly cartLink: Locator;
    readonly cartItems: Locator;

    constructor(page: Page){
            this.page = page;
            this.sortDropdown = page.getByTestId('product-sort-container');
            this.itemPrices = page.getByTestId('inventory-item-price');
            this.cartBadge = page.getByTestId('shopping-cart-badge');
            this.cartLink = page.getByTestId('shopping-cart-link');
            this.cartItems = page.getByTestId('shopping-cart-item');
    }

    async sortBy(label: string) {
       await this.sortDropdown.selectOption({ label });
    }

    async getPrices(): Promise<number[]> {
        const texts = await this.itemPrices.allTextContents();
        return texts.map((text) => parseFloat(text.replace('$', '')));
    }

    async addToCart(productName: string) {
        await this.page
        .getByTestId('inventory-item')
        .filter({ hasText: productName })
        .getByRole('button', { name: 'Add to cart' })
        .click();
    }

    async openCart() {
        await this.cartLink.click();
    }
}