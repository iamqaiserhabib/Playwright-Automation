const {test,expect} = require('@playwright/test')

test('Browser context playwright test', async ({browser}) => {
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
    const userName = page.locator('#username')
    const signIn = page.locator('#signInBtn')
    const cardTitles = page.locator('.card-body a')
    await userName.fill('mynameisjohn')
    await page.locator('[type="password"]').fill('learning')
    await signIn.click()
    await expect(page.locator('[style*="block"]')).toContainText('Incorrect')
    await userName.fill('')
    await userName.fill('rahulshettyacademy')
    await signIn.click()
    const allTitles = await cardTitles.allTextContents()
})

test('UI Controls', async ({page}) => {
    await page.on('request', request=> console.log(request.url()))
    await page.route('**/*.css', route=> route.abort())
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
    const userName = page.locator('#username')
    const signIn = page.locator('#signInBtn')
    const dropDown = page.locator('select.form-control')
    const documentLink = page.locator('[href*="documents-request"]')

    await userName.fill('rahulshettyacademy')
    await page.locator('[type="password"]').fill('learning')
   
    await page.locator('.radiotextsty').last().click()
    await page.locator('#okayBtn').click()
    await expect(page.locator('.radiotextsty').last()).toBeChecked()
    
    await dropDown.selectOption('consult')
    
    await page.locator('#terms').click()
    await expect(page.locator('#terms')).toBeChecked()

    await expect(documentLink).toHaveAttribute("class", "blinkingText")
    await signIn.click()
})

test('Child window handling', async ({browser}) => {
    const context = await browser.newContext()
    const page = await context.newPage()
    const userName = page.locator('#username')
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
    const documentLink = page.locator('[href*="documents-request"]')
    const [newPage] = await Promise.all(
        [
            context.waitForEvent('page'),
            documentLink.click()
        ]
    )
    const text = await newPage.locator('.red').textContent()
    const arrayText = text.split('@')
    const domain = arrayText[1].split(' ')[0]
    await page.locator('#username').fill(domain)
})