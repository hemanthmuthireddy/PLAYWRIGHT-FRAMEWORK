class LoginPage {
  constructor(page) {
    this.page = page;
    this.username = page.locator('#userEmail');
    this.password = page.locator('#userPassword');
    this.loginBtn =  page.getByRole('button', { name: ' Log In ' });
  }

  async navigateto() {
    await this.page.goto('/');
  }

  async login(user, pass) {
    await this.username.fill(user);
    await this.password.fill(pass);
    await this.loginBtn.click();
  }
}

module.exports = LoginPage;