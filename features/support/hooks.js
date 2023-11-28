const { Before, After, BeforeStep, AfterStep, Status } = require('@cucumber/cucumber')
const { POManager } = require('../../tests/pageobjects/POManager')
const playwright = require('@playwright/test')

Before(async function () {
    const browser = await playwright.chromium.launch()
    const context = await browser.newContext()
    this.page = await context.newPage()
    this.poManager = new POManager(this.page);
});

After(function () {
    console.log('I am last to execute')
});

BeforeStep( function () {
});

AfterStep(async function ({ result }) {
    if (result.status === Status.FAILED) {
        await this.page.takeScreenshot({path: 'screenshot123.png'});
    }
});