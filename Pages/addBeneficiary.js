class addBeneficiary {
    constructor(page) {
        this.page = page;
        this.navToBene = page.getByTestId('nav-beneficiaries');
        this.beneBtn = page.getByTestId('addBeneficiaryBtn');
        this.beneFullName = page.getByPlaceholder('Enter beneficiary name');
        this.beneaccNo = page.getByTestId('beneAccNo');
        this.beneconfrmAcc = page.getByTestId('beneConfirmAccNo');
        this.beneIfsc = page.locator('#beneIfsc');
        this.nickName = page.locator('#beneNickname');
        this.addBeneBtn = page.getByRole('button', { name: 'Add Beneficiary' });
        this.successMsg=page.getByTestId('beneSuccessMsg');

     
    }

    async createBene(beneDetails) {

        await this.navToBene.click();
        await this.beneBtn.click();
  
        // const beneFullName = 'Baunty Prusty';
        await this.beneFullName.fill(beneDetails.Beneficiary_name)
        await this.beneaccNo.fill(beneDetails.Account_Number);
        await this.beneconfrmAcc.fill(beneDetails.Confirm_Account_No)
        await this.beneIfsc.fill(beneDetails.IFSC_Code)
        await this.nickName.fill(beneDetails.Nickname)
        await this.addBeneBtn.click()
        return this.getbeneName();

    }

    async getbeneName(){
        const SuccessMsg=await this.successMsg.textContent();
        const beneName=SuccessMsg.split('"')[1].trim();
      
        // await expect(this.page.getByTestId('beneSuccessMsg')).toHaveText(`Beneficiary "${beneName}" added successfully.`)
        return beneName;
    }
}
module.exports={addBeneficiary}