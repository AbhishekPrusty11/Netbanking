require('dotenv').config()
const { test, expect } = require('../Fixtures/customFixtures/pageObjects')
const payment = require('../Fixtures/test_data/billPayment.json')

test.describe('Bill Payments', () => {

    test.beforeEach(async ({ loginpage }) => {
        await loginpage.goto()
        await loginpage.validLogin({ Email: process.env.LOGIN_EMAIL, Password: process.env.LOGIN_PASSWORD })

    })

    for (const [flowName, input] of Object.entries(payment))

        test(`${flowName} Bill Payment`, async ({ billpayment }) => {

            await billpayment.openBillPayment();
            await billpayment.selectCategory(input);
            const successMsg = await billpayment.getSuccessMsg();
            console.log(`${input.Select_Category} Bill Payment Successful :${successMsg}`);

        })
})