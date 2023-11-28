const { When, Then, Given } = require('@cucumber/cucumber')
const { POManager } = require('../../tests/pageobjects/POManager')
const { test, expect } = require('@playwright/test')
const playwright = require('@playwright/test')

Given('Login to ecommerce application with {string} and {string}', {timeout: 100*1000}, async function (username, password) {
    const products = this.page.locator(".card-body");
    const loginPage = this.poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(username, password);
});

When('Add {string} to cart', {timeout: 100*1000}, async function (productName) {
    this.dashboardPage = this.poManager.getDashboardPage();
    // await page.waitForTimeout(2000)
    await this.dashboardPage.searchProductAddCart(productName);
    // await page.pause()
    await this.dashboardPage.navigateToCart();
});

Then('Verify {string} is displayed in the cart', async function (productName) {
    const cartPage = this.poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(productName);
    await cartPage.Checkout();
});

Given('Enter valid details and place the order', async function () {
    const ordersReviewPage = this.poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind", "India");
    this.orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(this.orderId);
});

Then('Verify order is present in the orderHistory', async function () {
    await this.dashboardPage.navigateToOrders();
    const ordersHistoryPage = this.poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(this.orderId);
    expect(this.orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
});