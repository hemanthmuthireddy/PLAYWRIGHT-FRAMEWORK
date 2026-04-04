const { test, expect } = require('@playwright/test');
const {LoginPage} = require('../../pages/LoginPage');
const users = require('../../data/users.json');

test.beforeEach('Gravty Login', async ({ page }) => {
  const login = new LoginPage(page);
 await login.navigateto();
  await login.login(users.validUser.username, users.validUser.password);
});
