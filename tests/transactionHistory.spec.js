require('dotenv').config()
const { test, expect } = require('../Fixtures/customFixtures/pageObjects')
// const fundData = require('../test_data/fundTransfer.json')
// const data = require('../test_data/createBene.json')


test.beforeEach(async ({ loginpage }) => {
    await loginpage.goto()
    await loginpage.validLogin({ Email: process.env.LOGIN_EMAIL, Password: process.env.LOGIN_PASSWORD })
})


test('Transaction History', async ({ txnHistory }) => {

    await txnHistory.getTxnRecords();
})
