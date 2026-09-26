const{test,expect}=require('../Fixtures/customFixtures/pageObjects')
const data = require('../Fixtures/test_data/UserDetails.json')
require('dotenv').config()



test("Create Login",async({page,loginpage})=>{
    
    await loginpage.goto()
    await loginpage.validLogin({Email:process.env.LOGIN_EMAIL,Password:process.env.LOGIN_PASSWORD})
})