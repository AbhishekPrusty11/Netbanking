class userRegistration {

    constructor(page) {
        this.page = page;
        this.strtPlanBtn = page.locator('#startPlanBtn');
        this.bankingPortalText = page.getByText('Banking Portal');
        this.bnkPortal = page.getByText('Banking Portal');
        this.wlcmMsg = page.getByRole('heading', { name: 'Welcome to ISB NetBanking' });
        this.regdBtn = page.getByTestId('navRegister');
        this.name = page.getByTestId('regName');
        this.email = page.getByTestId('regEmail')
        this.phone = page.getByTestId('regPhone')
        this.passwd = page.getByTestId('regPassword');
        this.confrmPwd = page.getByTestId('regConfirmPassword');
        this.continueBtn = page.getByRole('button', { name: 'Continue' });
        this.accountnum = page.getByTestId('generatedAccountNo')
        this.contBtn = page.getByTestId('nextBtn2');
        this.submitBtn = page.getByTestId('submitBtn');
        this.bankHeader = page.getByTestId('bank-header');
        this.errormesg = page.getByTestId('errorMsg');


    }

    async goto(url) {
        await this.page.goto(url)
    }

    async navigateToRegistration() {
        await this.strtPlanBtn.click();
        await this.bankingPortalText.waitFor({ state: 'visible' });
        await this.bnkPortal.click();
        await this.wlcmMsg.waitFor({ state: 'visible' });
        await this.regdBtn.click();
    }

    async personalDetails(regdInput) {
        await this.name.fill(regdInput.Name)
        await this.email.fill(regdInput.Email)
        await this.phone.fill(regdInput.Phone_Number)
        await this.passwd.fill(regdInput.Password)
        await this.confrmPwd.fill(regdInput.Confirm_Password)
        await this.continueBtn.click();
    }

    async accountSetup(OTP) {
        const accountNumber = await this.accountnum.textContent();

        await this.contBtn.click();

        for (let i = 0; i < OTP.length; i++) {
            await this.page.getByTestId(`regOtp${i}`).fill(OTP[i]);
        }
        await this.submitBtn.click();
        await this.bankHeader.waitFor({ state: 'visible' })

        return accountNumber;
    }
    async getErrorMessage() {
       return await this.errormesg.textContent();
    }

}
module.exports = { userRegistration }
