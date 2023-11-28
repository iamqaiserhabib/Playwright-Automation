const {test,expect} = require('@playwright/test')
let webContext

test.beforeAll(async ({browser})=>{
    const context = await browser.newContext()
    const page = await context.newPage()
    const email = "anshika@gmail.com"
    await page.goto('https://rahulshettyacademy.com/client')
    await page.locator('#userEmail').fill(email)
    await page.locator('#userPassword').fill('Iamking@000')
    await page.locator('[value="Login"]').click()
    await page.waitForLoadState('networkidle')
    await context.storageState({path: 'state.json'})
    webContext = await browser.newContext({storageState: 'state.json'})
})

test('Browser context playwright test', async () => {
    const productName = "zara coat 3"
    const email = "anshika@gmail.com"
    const page = await webContext.newPage()
    await page.goto('https://rahulshettyacademy.com/client')
    const products = page.locator('.card-body')
    const titles = await page.locator('.card-body b').allTextContents()
    console.log(titles)
    // Get count of the products
    const count = await products.count()
    //iteration
    for(let i=0; i<count; ++i){
        if(await products.nth(i).locator('b').textContent() === productName){
            //Add the product into cart
            await page.waitForTimeout(2000);
            await products.nth(i).locator('text = Add To Cart').click()
            break
        }
    }
    //Click on the cart button
    // await page.locator('div li').first().waitFor({state: 'visible'})
    await page.waitForTimeout(2000);
    await page.locator('[routerlink*="cart"]').click()
    // await page.locator('div li').first().waitFor({state: 'visible'})
    await page.waitForTimeout(2000);
    const bool = await page.locator('h3:has-text("zara coat 3")').isVisible()
    await expect(bool).toBeTruthy()
    //Checkout
    await page.locator('text = Checkout').click()
    await page.locator('[placeholder="Select Country"]').fill('India',{delay: 100})
    const dropdown = await page.locator('.ta-results')
    const optionsCount = await dropdown.locator('button').count()
    for(let i=0; i<optionsCount; ++i){
        const text = await dropdown.locator('button').nth(i).textContent()
        if(text === ' India'){
            await dropdown.locator('button').nth(i).click()
            break
        }
    }
    await expect(page.locator('.user__name label')).toHaveText(email)
    await page.locator('.action__submit').click()
    // await expect(page.locator('.hero-primary')).toHaveText(' Thankyou for the order. ')
    // const orderId = await page.locator('label[class="ng-star-inserted"]').textContent()
    // console.log(orderId)
    // await page.pause()
    await page.locator('[routerlink="/dashboard/myorders"]').click()  
    // const rows = await page.locator('tbody tr')
    // for(let i=0; i<await rows.count(); ++i){
    //     const rowOrderId = await rows.nth(i).locator('th').textContent()
    //     if(orderId.includes(rowOrderId)){
    //         await rows.nth(i).locator('button').first().click()
    //         break
    //     }
    // }
    // const orderIdDetails = await page.locator('.col-text').textContent()
    // await expect(orderId.includes(orderIdDetails)).toBeTruthy()
})