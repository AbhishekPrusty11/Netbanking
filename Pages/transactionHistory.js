class transactionHistory {
    constructor(page) {

        this.page = page;
        this.navHis = page.getByTestId('nav-transactions')
        this.frmDate = page.getByRole('textbox', { name: 'Date From' })
        this.toDate = page.getByRole('textbox', { name: 'Date To' })
        this.typeDrop = page.getByRole('combobox', { name: 'Type' })
        this.statusDrop = page.getByRole('combobox', { name: 'Status' })
        this.applyFilters = page.getByRole('button', { name: 'Apply Filters' })
        this.clearBtn = page.getByTestId('clearFilters');



    }
    getDate(daysFromToday) {
        const date = new Date();
        date.setDate(date.getDate() + daysFromToday)
        return date.toISOString().split('T')[0]
    }

    async getTxnRecords() {
        await this.navHis.click();
        const fromDate = this.getDate(0);
        const toDate = this.getDate(0);

        await this.frmDate.fill(fromDate);
        await this.toDate.fill(toDate);
        await this.typeDrop.selectOption('All');
        await this.statusDrop.selectOption('All');
        await this.applyFilters.click();
        await this.clearBtn.click();
    }

}
module.exports = { transactionHistory }