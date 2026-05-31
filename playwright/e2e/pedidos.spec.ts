import { test, expect } from '@playwright/test'
///AAA - Preparar, agir, verificar

import { generateOrderCode } from './support/helpers';
import { number } from 'zod';

test('deve consultar um pedido aprovado', async ({ page }) => {

  //definir dados de teste
  //const order = 'VLO-U32QEM'
  const order = {
    number: 'VLO-U32QEM',
    color: 'Glacier Blue',
    wheels: 'Aero Wheels',
  
    customer: {
      name: 'Pollyana Seixas',
      email: 'pollysfontesseixas@gmail.com',
    },
  
    payment: 'À Vista',
  };
  await page.goto('http://localhost:5173/')
  //Preparar
  await expect(page.getByTestId('hero-section').getByRole('heading', { name: 'Velô Sprint' })).toBeVisible()
  //Ação - Agir
  await page.getByRole('link', { name: 'Consultar Pedido' }).click()
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido')
  //identificção visual humanizar as indicações de que o teste está sendo executado
  //encontrar label de texto que contenha o texto "numero pedido"
  //('//label[contains(text(), "Numero Pedido")]')
  await page.getByTestId('search-order-id').fill(order)
  await page.getByTestId('search-order-button').click()
  //verificar
  //await page.waitForTimeout(10000);fica esperado
  //tempo de espera para o elemento ser visivel-explicito melhor para o teste
  // await expect(page.getByTestId('order-result-id')).toBeVisible({ timeout: 10000 })
  // await expect(page.getByTestId('order-result-id')).toContainText(order)
  // await expect(page.getByTestId('order-result-status')).toBeVisible()
  // await expect(page.getByTestId('order-result-status')).toContainText('APROVADO')
  await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
    - img
    - paragraph: Pedido
    - paragraph: ${order.number}
    - img
    - text: APROVADO
    - img "Velô Sprint"
    - paragraph: Modelo
    - paragraph: Velô Sprint
    - paragraph: Cor
    - paragraph: ${order.color}
    - paragraph: Interior
    - paragraph: cream
    - paragraph: Rodas
    - paragraph: ${order.wheels}
    - heading "Dados do Cliente" [level=4]
    - paragraph: Nome
    - paragraph: ${order.customer.name}
    - paragraph: Email
    - paragraph: ${order.customer.email}
    - paragraph: Loja de Retirada
    - paragraph
    - paragraph: Data do Pedido
    - paragraph: /\\d+\\/\\d+\\/\\d+/
    - heading "Pagamento" [level=4]
    - paragraph: ${order.payment}
    - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
    `);

});
 //interpola variavel para teste dinamico - Use backticks.
 //disposição onde os testes são rendereizados - funciona muito bem testes de regressão snapshot

 test(' deve consultar um pedido reprovado', async ({ page }) => {
  //definir dados de teste
 const order = 'VLO-LIKG5T'

  await page.goto('http://localhost:5173/')
  //Preparar
  await expect(page.getByTestId('hero-section').getByRole('heading', { name: 'Velô Sprint' })).toBeVisible()
  //Ação - Agir
  await page.getByRole('link', { name: 'Consultar Pedido' }).click()
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido')
  await page.getByTestId('search-order-id').fill(order)
  await page.getByTestId('search-order-button').click()
  await expect(page.getByTestId(`order-result-${order}`)).toMatchAriaSnapshot(`
    - img
    - paragraph: Pedido
    - paragraph: VLO-LIKG5T'
    - img
    - text: REPROVADO
    - img "Velô Sprint"
    - paragraph: Modelo
    - paragraph: Velô Sprint
    - paragraph: Cor
    - paragraph: Glacier Blue
    - paragraph: Interior
    - paragraph: cream
    - paragraph: Rodas
    - paragraph: sport Wheels
    - heading "Dados do Cliente" [level=4]
    - paragraph: Nome
    - paragraph: Maria Fee
    - paragraph: Email
    - paragraph: maria@gmail.com
    - paragraph: Loja de Retirada
    - paragraph
    - paragraph: Data do Pedido
    - paragraph: /\\d+\\/\\d+\\/\\d+/
    - heading "Pagamento" [level=4]
    - paragraph: À Vista
    - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
    `);

});


test('deve exibir mensagem de erro quando o pedido não for encontrado', async ({ page }) => {
  //defini o pedido errado
  const order = generateOrderCode()
  //gestao de massa de dados
  //acessar a pagina de consulta de pedido
  await page.goto('http://localhost:5173/')
  await expect(page.getByTestId('hero-section').getByRole('heading', { name: 'Velô Sprint' })).toBeVisible()
  await page.getByRole('link', { name: 'Consultar Pedido' }).click()
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido')
  await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order)
  await page.getByRole('button', { name: 'Buscar Pedido' }).click()
  await expect(page.locator('#root')).toContainText('Verifique o número do pedido e tente novamente')
  await expect(page.locator('#root')).toContainText('Pedido não encontrado')
  await expect(page.locator('#root')).toMatchAriaSnapshot(`
    - img
    - heading "Pedido não encontrado" [level=3]
    - paragraph: Verifique o número do pedido e tente novamente
    `) // verfica se na area tem a imagem, heading e paragraph

});
// await expect(page.locator('#root')).toContainText('Verifique o número do pedido e tente novamente')
// await expect(page.locator('#root')).toContainText('Pedido não encontrado')
//P html não é acessivel para o playwright
//  const title = page.getByRole('heading', { name: 'Pedido não encontrado' })
//  await expect(title).toBeVisible()
//  const message = page.locator('p',{hasText:'Verifique o número do pedido e tente novamente'})
//  await expect(message).toBeVisible()
//  const title = page.getByRole('heading', { name: 'Pedido não encontrado' })
//  await expect(title).toBeVisible()
//usar solução getbytext
//root raiz todo html
//xpath  const message = page.locator('//p[text()="Verifique o número do pedido e tente novamente"]')
//await expect(message).toBeVisible()




