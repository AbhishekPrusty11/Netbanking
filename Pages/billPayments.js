class BillPayments {
    constructor(page) {
        this.page = page
        this.billPaymntMenu = page.getByRole('link', { name: 'Bill Payments' });
        // this.category = page.getByTestId(`category-${input.Select_Category}`);
        this.consumerNo = page.getByTestId('consumerNumber');
        this.amount = page.getByPlaceholder('Enter amount');
        this.payBtn = page.getByTestId('payBillBtn');
        this.successMsg = page.getByTestId('billSuccessMsg');
        this.Biller = page.getByTestId('billerProvider');

    }


    async getSuccessMsg() {
        const successMsg = await this.successMsg.textContent();
        // console.log(`${input.Select_Category} Bill Payment Successful :${successMsg}`);
        return successMsg;
    }
    async openBillPayment() {
        await this.billPaymntMenu.click();
    }
    async selectCategory(input) {
        await this.page.getByTestId(`category-${input.Select_Category}`).click();
        await this.enterDetails(input);
    }
    async enterDetails(input) {
        await this.Biller.selectOption(input.Biller);
        await this.consumerNo.fill(input.Consumer_Number)
        await this.amount.fill(input.Amount)
        await this.payBtn.waitFor({ state: 'visible' })
        await this.clikOnPay();

    }
    async clikOnPay() {
        await this.payBtn.click();
    }
}
module.exports = { BillPayments }