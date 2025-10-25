const { test, expect } = require('@playwright/test');
const {customtest} = require('../utils/test-base')
const { POManager } = require('./pageobjects/POManager');
const dataSet = JSON.parse(JSON.stringify(require('../utils/placeOrderTestData.json')))

for (const data of dataSet) {
    test(`Client App login for ${data.productName}`, async ({ page }) => {
        const poManager = new POManager(page);
        const products = page.locator(".card-body");
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();
        await loginPage.validLogin(data.username, data.password);
        const dashboardPage = poManager.getDashboardPage();
        await page.waitForTimeout(2000)
        await dashboardPage.searchProductAddCart(data.productName);
        // await page.pause()
        await dashboardPage.navigateToCart();

        const cartPage = poManager.getCartPage();
        await cartPage.VerifyProductIsDisplayed(data.productName);
        await cartPage.Checkout();

        const ordersReviewPage = poManager.getOrdersReviewPage();
        await ordersReviewPage.searchCountryAndSelect("ind", "India");
        const orderId = await ordersReviewPage.SubmitAndGetOrderId();
        console.log(orderId);
        await dashboardPage.navigateToOrders();
        const ordersHistoryPage = poManager.getOrdersHistoryPage();
        await ordersHistoryPage.searchOrderAndSelect(orderId);
        expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
    })
}

// customtest.skip('Client App login', async ({page, testDataForOrder}) => {
//     const poManager = new POManager(page);
//     const products = page.locator(".card-body");
//     const loginPage = poManager.getLoginPage();
//     await loginPage.goTo();
//     await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password);
//     const dashboardPage = poManager.getDashboardPage();
//     await page.waitForTimeout(2000)
//     await dashboardPage.searchProductAddCart(testDataForOrder.productName);
//     // await page.pause()
//     await dashboardPage.navigateToCart();

//     const cartPage = poManager.getCartPage();
//     await cartPage.VerifyProductIsDisplayed(testDataForOrder.productName);
//     await cartPage.Checkout();
// })