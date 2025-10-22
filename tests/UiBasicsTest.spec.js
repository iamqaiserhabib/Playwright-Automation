const {test,expect} = require('@playwright/test')

test('Browser context playwright test', async ({browser}) => {
    //Getting the title of the page
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
    console.log(await page.title())
    //Filling the login form and extracting the error message
    const userName = page.locator('#username')
    const signIn = page.locator('#signInBtn')
    const cardTitles = page.locator('.card-body a')
    await userName.fill('mynameisjohn')
    await page.locator('[type="password"]').fill('learning')
    await signIn.click()
    console.log(await page.locator('[style*="block"]').textContent())
    await expect(page.locator('[style*="block"]')).toContainText('Incorrect')
    // Entering the correct userName and getting sign in 
    await userName.fill('')
    await userName.fill('rahulshettyacademy')
    //race condition
    // await Promise.all(
    //     [
    //         page.waitForURL(),
    //         signIn.click()
    //     ]
    // )
    await signIn.click()
    console.log(await cardTitles.nth(0).textContent())
    const allTitles = await cardTitles.allTextContents()
    console.log(allTitles)
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
    
    //Handling radio buttons
    await page.locator('.radiotextsty').last().click()
    await page.locator('#okayBtn').click()
    await expect(page.locator('.radiotextsty').last()).toBeChecked()
    
    //Handling static dropdown
    await dropDown.selectOption('consult')
    
    //Handling checkboxes
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
    console.log(domain)
    await page.locator('#username').fill(domain)
    console.log(await page.locator('#username').textContent())
})