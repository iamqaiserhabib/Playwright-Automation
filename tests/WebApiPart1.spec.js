const {test,expect,request} = require('@playwright/test')
const {ApiUtils} = require('./utils/ApiUtils')

const loginPayLoad = {userEmail: "anshika@gmail.com", userPassword: "Iamking@000"}
const orderPayLoad = {orders: [{country: "India", productOrderedId: "6262e95ae26b7e1a10e89bf0"}]}
let token
let orderId
let responce

test.beforeAll( async ()=>{
    //Login apiy
    const apiContext = await request.newContext()
    const apiUtils = new ApiUtils(apiContext,loginPayLoad)
    responce = await apiUtils.createOrder(orderPayLoad)
})   

test('Place the order', async ({page}) => {
    page.addInitScript(value => { 
        window.localStorage.setItem('token',value)
    }, responce.token)
    const products = page.locator('.card-body')
    await page.goto('https://rahulshettyacademy.com/client')
    await page.locator('[routerlink="/dashboard/myorders"]').click() 
    // await page.pause()
    await page.waitForTimeout(2000); 
    const rows = await page.locator('tbody tr')
    for(let i=0; i<await rows.count(); ++i){
        const rowOrderId = await rows.nth(i).locator('th').textContent()
        if(responce.orderId.includes(rowOrderId)){
            await rows.nth(i).locator('button').first().click()
            break
        }
    }
    await page.waitForTimeout(2000);
    const orderIdDetails = await page.locator('.col-text').textContent()
    await page.pause()
    await expect(responce.orderId.includes(orderIdDetails)).toBeTruthy()
})