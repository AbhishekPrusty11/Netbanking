class FixedDeposit {
    constructor(page) {
        this.page = page
        this.depositMenu = page.getByTestId('nav-fixed-deposits');
        this.amount = page.getByTestId('fdAmount');
        this.intrstrate = page.getByTestId('fdRate');
        this.maturityAmnt=page.getByTestId('fdMaturityAmount');

    }

    async openFixedDeposit() {
        await this.depositMenu.click();

    }
    async fillDetails(input) {
        await this.amount.fill(input.Amount);
        await this.page.getByTestId(input.Year).click();

    }
    async getIntrstRate() {
        const Interest_Rate = await this.intrstrate.textContent();
        return Interest_Rate;
    }
    async getMaturityAmnt() {
        const mat_Amount = await this.maturityAmnt.textContent();
        return mat_Amount;
    }
}
module.exports = { FixedDeposit }