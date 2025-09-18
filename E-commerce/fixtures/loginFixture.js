const { test: baseTest } = require('@playwright/test');

const test = baseTest.extend({
  // Cria uma fixture 'login'
  login: async ({ page }, use) => {
    // Acessa o site
    await page.goto('https://www.saucedemo.com/');

    // Faz login
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    // Aguarda a página carregar após login
    await page.waitForSelector('.inventory_list');

    // Disponibiliza a página logada para o teste
    await use(page);
  }
});
module.exports = { test };