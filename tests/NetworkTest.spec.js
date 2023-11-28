const { test, expect, request } = require('@playwright/test')
const { ApiUtils } = require('../utils/ApiUtils')

const loginPayLoad = { userEmail: "anshika@gmail.com", userPassword: "Iamking@000" }
const orderPayLoad = { orders: [{ country: "India", productOrderedId: "6262e95ae26b7e1a10e89bf0" }] }
const fakePayLoadOrders = { data: [], message: "No Orders" };
let token
let orderId
let responce

test.beforeAll(async () => {
    //Login api
    const apiContext = await request.newContext()
    const apiUtils = new ApiUtils(apiContext, loginPayLoad)
    responce = await apiUtils.createOrder(orderPayLoad)
})

test('Place the order', async ({ page }) => {
    page.addInitScript(value => {
        window.localStorage.setItem('token', value)
    }, responce.token)
    await page.goto('https://rahulshettyacademy.com/client')
    await page.locator("button[routerlink*='myorders']").click()
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6218dad22c81249b296508b9",
    route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6' })
    )
    await page.locator('button:has-text("View")').first().click()
    // await page.pause()
})