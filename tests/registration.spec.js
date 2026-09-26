require('dotenv').config()
const { test, expect } = require('../Fixtures/customFixtures/pageObjects')
const data = require('../Fixtures/test_data/UserDetails.json')

test.describe('User Registration', () => {

    test('Valid User Registration', async ({ userregistration }) => {


        await userregistration.goto(process.env.BASE_URL);
        await userregistration.navigateToRegistration();

        //Registration
        await userregistration.personalDetails(data.Valid_Registration.regdDetails);

        //Account Setup
        const accountNumber = await userregistration.accountSetup(data.Valid_Registration.regdDetails.OTP);

        console.log(`Account Number : ${accountNumber}`);

    })

    test('InValid mobile number during user Registration', async ({ userregistration }) => {


        await userregistration.goto(process.env.BASE_URL);
        await userregistration.navigateToRegistration();

        //Registration
        await userregistration.personalDetails(data.InValid_Registration.regdDetails);
        const errorMsg = await userregistration.getErrorMessage();
        console.log(`Error Message : ${errorMsg}`);
    })
})


