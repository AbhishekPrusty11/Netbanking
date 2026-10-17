const { type } = require("node:os");

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
        this.successmsg = page.getByTestId('successMessage');

    }

    async selectBene(beneFullName) {
        //Fund Transafer
        await this.fundTrnsmenu.click();
        await this.neft.click();
        await this.nxtBtn1.click();
        await this.page.getByText(`${beneFullName}`).click();
        await this.contBtn.click();
    }

    async getInvalidAmntErrorMsg() {
        const AmntError_msg = (await this.page.getByTestId('error-transferAmount').textContent()).trim();
        return AmntError_msg
    }
    async getInvalidOTPErrorMsg() {
        const OtpError_msg = (await this.page.getByTestId('error-otp').textContent()).trim();
        return OtpError_msg
    }

    async enterAmountandSubmit(input, flowName) {

        const balance_text = await this.page.locator('.ml-3.text-gray-500').textContent();
        const available_amount = Number(balance_text.replace('Balance:', '').replace('₹', '').replace(/,/g, '').trim());

        const transfer_amount = Number(input.Amount);

        console.log(`Available balance: ${available_amount}`);
        console.log(`Transfer amount: ${transfer_amount}`);

        if (available_amount < transfer_amount) {
            await this.amount.fill(input.Amount);
            await this.nxtBtn3.click();
            const error_msg = await this.getInvalidAmntErrorMsg();

            return {
                status: 'error', type: 'amount', message: error_msg
            }
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
        if (flowName === 'Invalid_OTP') {
            const errorMessage = await this.getInvalidOTPErrorMsg();

            return {
                status: 'error',
                message: errorMessage
            };
        }

        const successMsg = (await this.successmsg.textContent()).trim()

        return {
            status: 'success',
            message: successMsg
        }
    }

}
module.exports = { fundTransfer }