require('dotenv').config()
const { test, expect } = require('../Fixtures/customFixtures/pageObjects')
const fundData = require('../Fixtures/test_data/fundTransfer.json')
const payment = require('../Fixtures/test_data/billPayment.json')

test.describe('Bill Payments', () => {



    test.beforeEach(async ({ loginpage }) => {
        await loginpage.goto()
        await loginpage.validLogin({ Email: process.env.LOGIN_EMAIL, Password: process.env.LOGIN_PASSWORD })

    })

    for (const [flowName, input] of Object.entries(payment))

        test(`${flowName} Bill Payment`, async ({ page }) => {

            await page.getByRole('link', { name: 'Bill Payments' }).click();
            await page.getByTestId(`category-${input.Select_Category}`).click();
            await page.getByTestId('billerProvider').selectOption(input.Biller);
            await page.getByTestId('consumerNumber').fill(input.Consumer_Number)
            await page.getByPlaceholder('Enter amount').fill(input.Amount)
            await page.getByTestId('payBillBtn').waitFor({ state: 'visible' })
            await page.getByTestId('payBillBtn').click();
            const successMsg = await page.getByTestId('billSuccessMsg').textContent();
            console.log(`Electrcity Bill Payment :${successMsg}`);
        })
})