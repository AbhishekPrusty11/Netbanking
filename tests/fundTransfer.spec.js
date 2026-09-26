require('dotenv').config()
const { test, expect } = require('../Fixtures/customFixtures/pageObjects')
const fundData = require('../Fixtures/test_data/fundTransfer.json')
const data = require('../Fixtures/test_data/createBene.json')


test.beforeEach(async ({ loginpage }) => {
    await loginpage.goto()
    await loginpage.validLogin({ Email: process.env.LOGIN_EMAIL, Password: process.env.LOGIN_PASSWORD })

})

for (const [flowName, input] of Object.entries(fundData)) {

    test(`Fund Transfer with ${flowName}`, async ({ page, addbeneficiary, fundtransfer, successpage }) => {
        const beneName = await addbeneficiary.createBene(data.validBene);
 
        await fundtransfer.selectBene(beneName);
        await fundtransfer.enterAmountandSubmit(input);

        const txnRefNumber = await successpage.txnSuccess();
        console.log(`Transaction Ref Number : ${txnRefNumber}`)

    })
}

