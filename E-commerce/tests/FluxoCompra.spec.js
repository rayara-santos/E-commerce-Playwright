const { test, expect } = require('../fixtures/loginFixture');

test('Fluxo de compra selecionando um item', async ({ login }) => {
  const page = login;

  // Pesquisar/adicionar um produto ao carrinho
  await page.waitForSelector('.inventory_item');
  const firstProduct = page.locator('.inventory_item').first();
  const productName = await firstProduct.locator('.inventory_item_name').innerText();
  await firstProduct.locator('button:has-text("Add to cart")').click();

  //  Acessar o carrinho
  await page.click('.shopping_cart_link');

  //  Prosseguir para checkout
  await page.click('text=Checkout');

  // Preencher informações do comprador
  await page.fill('#first-name', 'Barbara');
  await page.fill('#last-name', 'Silva');
  await page.fill('#postal-code', '12345');
  await page.click('text=Continue');

  //  Revisar e finalizar compra
  page.locator('.inventory-item', { hasText: productName });
  await page.click('text=Finish');

  //  Verificar confirmação da compra
  await page.locator('.complete-header', { hasText: 'Thank you for your order!'});

});

test('Fluxo de compra selecionando 2 itens', async ({ login }) => {
  const page = login;
  let product = [];
  let productName = [];

  //Decobrir quantos elementros tem em tela
  const items = page.locator('.inventory_item');
  const count = await items.count(); 
  const indices = [];
  while (indices.length < 2) {
    const randIndex = Math.floor(Math.random() * count);
    if (!indices.includes(randIndex)) {
      indices.push(randIndex);
    }
}

  // Adicionar primeiro produto ao carrinho
  product = items.nth(indices[0]);
  productName = await product.locator('.inventory_item_name').innerText();
  await product.locator('button:has-text("Add to cart")').click();

  // Adicionar segundo produto ao carrinho
  product = items.nth(indices[1]);
  productName = await product.locator('.inventory_item_name').innerText();
  await product.locator('button:has-text("Add to cart")').click();

  //  Acessar o carrinho
  await page.click('.shopping_cart_link');

  //  Prosseguir para checkout
  await page.click('text=Checkout');

  //Preencher informações do comprador
  await page.fill('#first-name', 'Barbara');
  await page.fill('#last-name', 'Silva');
  await page.fill('#postal-code', '12345');
  await page.click('text=Continue');

  // 7. Revisar e finalizar compra
  page.locator('.inventory-item', { hasText: productName[0] });
  page.locator('.inventory-item', { hasText: productName[1] });
  await page.click('text=Finish');

  // 8. Verificar confirmação da compra
  await page.locator('.complete-header', { hasText: 'Thank you for your order!'});

});

test('Fluxo de compra selecionando o ultimo', async ({ login }) => {
  const page = login;

  // Pesquisar/adicionar um produto ao carrinho
  await page.waitForSelector('.inventory_item');
  const firstProduct = page.locator('.inventory_item').last();
  const productName = await firstProduct.locator('.inventory_item_name').innerText();
  await firstProduct.locator('button:has-text("Add to cart")').click();

  // Acessar o carrinho
  await page.click('.shopping_cart_link');

  // Prosseguir para checkout
  await page.click('text=Checkout');

  // Preencher informações do comprador
  await page.fill('#first-name', 'Barbara');
  await page.fill('#last-name', 'Silva');
  await page.fill('#postal-code', '12345');
  await page.click('text=Continue');

  // Revisar e finalizar compra
  page.locator('.inventory-item', { hasText: productName });
  await page.click('text=Finish');

  // Verificar confirmação da compra
  await page.locator('.complete-header', { hasText: 'Thank you for your order!'});

});

test('Fluxo de compra removendo um item do carrinho', async ({ login }) => {
  const page = login;
  let product = [];
  let productName = [];

  //Decobrir quantos elementros tem em tela
  const items = page.locator('.inventory_item');
  const count = await items.count(); 
  const indices = [];
  while (indices.length < 2) {
    const randIndex = Math.floor(Math.random() * count);
    if (!indices.includes(randIndex)) {
      indices.push(randIndex);
    }
}

  // Adicionar primeiro produto ao carrinho
  product = items.nth(indices[0]);
  productName = await product.locator('.inventory_item_name').innerText();
  await product.locator('button:has-text("Add to cart")').click();

  // Adicionar segundo produto ao carrinho
  product = items.nth(indices[1]);
  productName = await product.locator('.inventory_item_name').innerText();
  await product.locator('button:has-text("Add to cart")').click();

  // Acessar o carrinho
  await page.click('.shopping_cart_link');

  // Remover item do carrinho
  await page.click('text=Remove');

  // Prosseguir para checkout
  await page.click('text=Checkout');

  //  Preencher informações do comprador
  await page.fill('#first-name', 'Barbara');
  await page.fill('#last-name', 'Silva');
  await page.fill('#postal-code', '12345');
  await page.click('text=Continue');

  //  Revisar e finalizar compra
  page.locator('.inventory-item', { hasText: productName });
  await page.click('text=Finish');

  // 8. Verificar confirmação da compra
  await page.locator('.complete-header', { hasText: 'Thank you for your order!'});

});

test('Fluxo de compra com carrinho vazio', async ({ login }) => {
  const page = login;

  // Pesquisar/adicionar um produto ao carrinho
  await page.waitForSelector('.inventory_item');

  // Acessar o carrinho
  await page.click('.shopping_cart_link');

  //  Prosseguir para checkout
  await page.click('text=Checkout');

  //  Preencher informações do comprador
  await page.fill('#first-name', 'Barbara');
  await page.fill('#last-name', 'Silva');
  await page.fill('#postal-code', '12345');
  await page.click('text=Continue');

  // Revisar e finalizar compra
  await page.click('text=Finish');

  //  Verificar confirmação da compra
  await page.locator('.complete-header', { hasText: 'Thank you for your order!'});

});

test('Fluxo de compra cancelamento', async ({ login }) => {
  const page = login;

  // Pesquisar/adicionar um produto ao carrinho
  await page.waitForSelector('.inventory_item');
  const firstProduct = page.locator('.inventory_item').first();
  const productName = await firstProduct.locator('.inventory_item_name').innerText();
  await firstProduct.locator('button:has-text("Add to cart")').click();

  //  Acessar o carrinho
  await page.click('.shopping_cart_link');

  //  Prosseguir para checkout
  await page.click('text=Checkout');

  // Preencher informações do comprador
  await page.fill('#first-name', 'Barbara');
  await page.fill('#last-name', 'Silva');
  await page.fill('#postal-code', '12345');
  await page.click('text=Continue');

  //  Revisar e finalizar compra
  page.locator('.inventory-item', { hasText: productName });
  await page.click('text=cancel');

  //  Verificar redirecionamento
  await page.waitForSelector('.inventory_item');

});