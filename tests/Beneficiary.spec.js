require('dotenv').config()
const { test, expect } = require('../Fixtures/customFixtures/pageObjects')
const data = require('../Fixtures/test_data/createBene.json')
const regdData=require('../Fixtures/test_data/UserDetails.json')


test.beforeEach(async({userregistration})=>{
    await userregistration.goto(process.env.BASE_URL);
    await userregistration.navigateToRegistration();

    //Registration
    await userregistration.personalDetails(regdData.Valid_Registration.regdDetails);

    //Account Setup
    await userregistration.accountSetup(regdData.Valid_Registration.regdDetails.OTP);
})

test('Add Beneficiary', async ({ page,addbeneficiary }) => {


    // //Navigation
    // await userregistration.goto(process.env.BASE_URL);
    // await userregistration.navigateToRegistration();

    // //Registration
    // await userregistration.personalDetails(data.regdDetails);

    // //Account Setup
    // await userregistration.accountSetup();

    //Beneficiaries
    await addbeneficiary.createBene(data.validBene);
    await expect(page.getByTestId('beneSuccessMsg')).toHaveText(`Beneficiary "${data.validBene.Beneficiary_name}" added successfully.`)
    await page.pause();
})