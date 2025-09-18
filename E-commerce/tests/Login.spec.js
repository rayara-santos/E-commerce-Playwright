const { test, expect } = require('@playwright/test');

test('Login', async({page}) => {
    // Acessa o site
    await page.goto('https://www.saucedemo.com/');

    // Faz login
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    // Aguarda a página carregar após login
    await page.waitForSelector('.inventory_list');
});

test('Login: Senha invalida' ,async ({page}) => {
  // Acessa o site
    await page.goto('https://www.saucedemo.com/');

    // Faz login
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'invalida');
    await page.click('#login-button');

    page.locator('.error', { hasText: 'Epic sadface: Username and password do not match any user in this service' });

});

test('Login: Usuario invalido' ,async ({page}) => {
  // Acessa o site
    await page.goto('https://www.saucedemo.com/');

    // Faz login
    await page.fill('#user-name', 'invalido');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    page.locator('.error', { hasText: 'Epic sadface: Username and password do not match any user in this service' });

});

test('Logout', async ({ page }) => {
  // Primeiro loga
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  // Executa logout
  await page.click('#react-burger-menu-btn'); // abre menu
  await page.click('#logout_sidebar_link');    // clica logout

  await expect(page).toHaveURL(/saucedemo.com/); // volta para login
});

