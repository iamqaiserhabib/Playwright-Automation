const {test,expect} = require('@playwright/test')

test('Popup Validations', async ({page})=>{
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/')
    // await page.goto('https://google.com')
    // await page.goBack()
    // await page.goForward()
    //Element display
    await expect(page.locator('#displayed-text')).toBeVisible()
    await page.locator('#hide-textbox').click()
    await expect(page.locator('#displayed-text')).toBeHidden()
    //Switch to alert
    await page.pause()
    await page.on('dialog',dialog => dialog.accept())
    await page.locator('#confirmbtn').click()
    //Mouse hover
    await page.locator('#mousehover').hover()
    //Switch to frames
    const framePage = await page.frameLocator('#courses-iframe')
    await framePage.locator('li a[href="lifetime-access"]:visible').click()
    const textCheck = await framePage.locator('.text h2').textContent()
    console.log(textCheck.split(' ')[1])
})

test('Screenshot', async ({page})=>{
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/')
    await expect(page.locator('#displayed-text')).toBeVisible()
    await page.locator('#displayed-text').screenshot({path: 'partialScreenshot.png'})
    await page.locator('#hide-textbox').click()
    await page.screenshot({path: 'screenshot.png'})
    await expect(page.locator('#displayed-text')).toBeHidden()
})

test.skip('Visual tesing', async ({page})=>{
    await page.goto('https://www.google.com/')
    expect(await page.screenshot()).toMatchSnapshot('landing.png')
})