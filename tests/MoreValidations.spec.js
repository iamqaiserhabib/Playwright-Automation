const {test,expect} = require('@playwright/test')
const { describe } = require('node:test')

test.describe.serial('More Validations', ()=>{
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
    await page.on('dialog',dialog => dialog.accept())
    await page.locator('#confirmbtn').click()
    //Mouse hover
    await page.locator('#mousehover').hover()
    //Switch to frames
    await page.waitForSelector('#courses-iframe', { timeout: 20000 });
    const framePage = page.frameLocator('#courses-iframe')
    await page.waitForTimeout(5000);
    const link = framePage.locator('li a[href="lifetime-access"]:visible');
    await expect(link).toBeVisible({ timeout: 15000 });
    await link.click();
    })

    test('Screenshot', async ({page})=>{
        await page.goto('https://rahulshettyacademy.com/AutomationPractice/')
        await expect(page.locator('#displayed-text')).toBeVisible()
        await page.locator('#displayed-text').screenshot({path: 'partialScreenshot.png'})
        await page.locator('#hide-textbox').click()
        await page.screenshot({path: 'screenshot.png'})
        await expect(page.locator('#displayed-text')).toBeHidden()
    })

    // test('Visual tesing', async ({page})=>{
    //     await page.goto('https://www.google.com/')
    //     expect(await page.screenshot()).toMatchSnapshot('landing.png')
    // })
    })
