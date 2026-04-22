import { test, expect } from '@playwright/test'
///AAA - Preparar, agir, verificar

test('deve consultar um pedido aprovado', async ({ page }) => {
  await page.goto('http://localhost:5173/')
  //Preparar

  //Chekponit
  await expect(page.getByTestId('hero-section').getByRole('heading', { name: 'Velô Sprint' })).toBeVisible()
  //Ação - Agir
  await page.getByRole('link', { name: 'Consultar Pedido' }).click()
  //checkpoint
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido')

  await page.getByTestId('search-order-id').fill('VLO-U32QEM')
  await page.getByTestId('search-order-button').click()

  
//verificar
  await expect(page.getByTestId('order-result-id')).toBeVisible()
  await expect(page.getByTestId('order-result-id')).toContainText('VLO-U32QEM')

  await expect(page.getByTestId('order-result-status')).toBeVisible()
  await expect(page.getByTestId('order-result-status')).toContainText('APROVADO')


});
