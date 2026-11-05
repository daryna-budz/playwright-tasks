import { test, expect } from '@playwright/test';
import { InventoryPage } from '../../pages/saucedemo/InventoryPage';
import { LoginPage } from '../../pages/saucedemo/LoginPage';


test.describe('Inventory', () => {
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user','secret_sauce');
    inventoryPage = new InventoryPage(page);
  });

  test('sorting by price (low to high)', async () =>{
    
    await inventoryPage.sortBy('Price (low to high)');
    const priceLocator = inventoryPage.itemPrices;

    await expect(priceLocator.first()).toBeVisible();

    const prices = await inventoryPage.getPrices();

    const expectedPrices = [...prices].sort((a, b) => a - b);

    expect(prices.length).toBeGreaterThan(0);
    expect(prices).toEqual(expectedPrices);
})

test("add 2 items to cart", async({page}) => {
    await inventoryPage.addToCart('Sauce Labs Backpack');
    await inventoryPage.addToCart('Sauce Labs Bike Light');
    await expect(inventoryPage.cartBadge).toHaveText('2');

    await inventoryPage.openCart();
    await expect(page.getByTestId('inventory-item-name')).toHaveText([
    'Sauce Labs Backpack',
    'Sauce Labs Bike Light',
  ]);
  });
});