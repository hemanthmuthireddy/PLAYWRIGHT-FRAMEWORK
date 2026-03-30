const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pages/LoginPage');
const users = require('../../data/users.json');

test('E2E Login Flow', async ({ page }) => {
  const login = new LoginPage(page);

  await page.goto('/');
  await login.login(users.validUser.username, users.validUser.password);

  await expect(page).toHaveURL(/inventory/);
});