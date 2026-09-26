class LoginPage {
    constructor(page) {
        this.page = page;
        this.userName = page.getByTestId('userId');
        this.pwd = page.getByTestId('password');
        this.loginBtn = page.getByTestId('loginBtn');

    }

    async goto() {
        await this.page.goto('/banking/login')
    }
    async validLogin(login) {
        await this.userName.fill(login.Email);
        await this.pwd.fill(login.Password)
        await this.loginBtn.click();
    }
}
module.exports={LoginPage}