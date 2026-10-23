const base = require('@playwright/test');
const { LoginPage } = require('../../Pages/LoginPage')
const { userRegistration } = require('../../Pages/userRegistration')
const { addBeneficiary } = require('../../Pages/addBeneficiary')
const { fundTransfer } = require('../../Pages/fundTransfer');
const { successPage } = require('../../Pages/successPage')
const { transactionHistory } = require('../../Pages/transactionHistory')
const { BillPayments } = require('../../Pages/BillPayments')


const test = base.test.extend({
    userregistration: async ({ page }, use) => {
        await use(new userRegistration(page))
    },
    addbeneficiary: async ({ page }, use) => {
        await use(new addBeneficiary(page))
    },
    loginpage: async ({ page }, use) => {
        await use(new LoginPage(page))
    },
    fundtransfer: async ({ page }, use) => {
        await use(new fundTransfer(page))
    },
    successpage: async ({ page }, use) => {
        await use(new successPage(page))
    },
    txnHistory: async ({ page }, use) => {
        await use(new transactionHistory(page))
    },
    billpayment:async({page},use)=>{
        await use(new BillPayments(page))
    }


})
module.exports = { test, expect: base.expect }

