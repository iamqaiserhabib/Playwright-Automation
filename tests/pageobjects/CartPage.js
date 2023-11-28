const {test, expect} = require('@playwright/test');
class CartPage
{
constructor(page)
{
    this.page = page;
    // this.cartProducts = page.locator('div li').first();
    this.productsText = page.locator(".card-body b");
    this.cart =  page.locator("[routerlink*='cart']");
    this.orders = page.locator("button[routerlink*='myorders']");
    this.checkout = page.locator("text=Checkout");

}

async VerifyProductIsDisplayed(productName)
{
    // await this.cartProducts
    // await this.page.waitForTimeout(2000);
    // const bool =await this.getProductLocator(productName).isVisible();
    // await expect(bool).toBeTruthy();

}

async Checkout()
{
    await this.checkout.click();
}

 async getProductLocator(productName)
{
    await this.page.waitForTimeout(2000);
    return  this.page.locator('h3:has-text("zara coat 3")');
}

}
module.exports = {CartPage};