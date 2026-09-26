class fundTransfer {
    constructor(page) {
        this.page = page;
        this.fundTrnsmenu = page.getByTestId('nav-fund-transfer');
        this.neft = page.getByTestId('type-NEFT');
        this.nxtBtn1 = page.getByTestId('nextBtn1');
        this.contBtn = page.getByRole('button', { name: 'Continue' });
        this.amount = page.getByTestId('transferAmount')
        this.remarks = page.getByTestId('remarks');
        this.nxtBtn3 = page.getByTestId('nextBtn3');
        this.confirmBtn = page.getByTestId('confirmTransferBtn');
        this.verifyBtn = page.getByTestId('verifyOtpBtn');
        this.successmsg=page.getByTestId('successMessage');

    }

    async selectBene(beneFullName) {
        //Fund Transafer
        await this.fundTrnsmenu.click();
        await this.neft.click();
        await this.nxtBtn1.click();
        await this.page.getByText(`${beneFullName}`).click();
        await this.contBtn.click();
    }

    async getAvailableBalance() {

    }

    async enterAmountandSubmit(input) {

        const balance_text = await this.page.locator('.ml-3.text-gray-500').textContent();
        const available_amount = Number(balance_text.replace('Balance:', '').replace('₹', '').replace(/,/g, '').trim());
        console.log(available_amount)


        const transfer_amount = Number(input.Amount);

        if (available_amount < transfer_amount) {
            await this.amount.fill(input.Amount);
            // await this.page.pause();
            await this.nxtBtn3.click();
            const error_msg = (await this.page.getByTestId('error-transferAmount').textContent()).trim();
            console.log(`Error Message : "${error_msg}`)
            return error_msg
        }

        //Enter Amount
        await this.amount.fill(input.Amount)
        await this.remarks.fill(input.remarks);
        await this.nxtBtn3.click();
        await this.confirmBtn.click();

        //OTP Verification
        for (let i = 0; i < input.OTP.length; i++) {
            await this.page.getByTestId(`otpBox-${i}`).fill(input.OTP[i]);
        }

        //verify button
        await this.verifyBtn.click();
       
        const successMsg = (await this.successmsg.textContent()).trim()

        return successMsg
    }

}
module.exports = { fundTransfer }