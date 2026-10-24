require('dotenv').config()
const { test, expect } = require('../Fixtures/customFixtures/pageObjects')
const DepositData = require('../Fixtures/test_data/FixedDeposit.json')

test.describe('Bill Payments', () => {

    test.beforeEach(async ({ loginpage }) => {
        await loginpage.goto()
        await loginpage.validLogin({ Email: process.env.LOGIN_EMAIL, Password: process.env.LOGIN_PASSWORD })

    })

    for (const [flowName, input] of Object.entries(DepositData))

        test(`Fixed Deposit for ${flowName}`, async ({ fixedeposit }) => {

            await fixedeposit.openFixedDeposit();
            await fixedeposit.fillDetails(input);
            const Interest_Rate = await fixedeposit.getIntrstRate();
            console.log(`Interest Rate for ${flowName} is ${Interest_Rate}`)
            const mat_Amount=await fixedeposit.getMaturityAmnt();
            console.log(`Maturity Amount for ${flowName} is ${mat_Amount}`)


        })

})