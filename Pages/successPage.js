class successPage {
    constructor(page) {
        this.page = page;
        this.txnRefno= page.getByTestId('txnRefNumber');
        this.dashboard=page.getByTestId('goToDashboard');
        this.dashboardHead=page.getByTestId('bank-header')

    }

    async txnSuccess() {
        // await expect(page.getByTestId('successMessage')).toHaveText('Transfer Successful!')

        const txnRefNumber = await this.txnRefno.textContent();

        //click ondashboard
        await this.dashboard.click();
        await this.dashboardHead.waitFor({ state: 'visible' })
        return txnRefNumber;
    }
}
module.exports={successPage}