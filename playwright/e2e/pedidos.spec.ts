import { test, expect } from '@playwright/test'
///AAA - Preparar, agir, verificar

test('deve consultar um pedido aprovado', async ({ page }) => {
  await page.goto('http://localhost:5173/')
  //Preparar
  await expect(page.getByTestId('hero-section').getByRole('heading', { name: 'Velô Sprint' })).toBeVisible()
  //Ação - Agir
  await page.getByRole('link', { name: 'Consultar Pedido' }).click()
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido')
//identificção visual humanizar as indicações de que o teste está sendo executado
//encontrar label de texto que contenha o texto "numero pedido"
//('//label[contains(text(), "Numero Pedido")]')
  await page.getByTestId('search-order-id').fill('VLO-U32QEM')
  await page.getByTestId('search-order-button').click()

//verificar
  //await page.waitForTimeout(10000);fica esperado
  //tempo de espera para o elemento ser visivel-explicito melhor para o teste
  await expect(page.getByTestId('order-result-id')).toBeVisible({ timeout: 10000 })
  await expect(page.getByTestId('order-result-id')).toContainText('VLO-U32QEM')

  await expect(page.getByTestId('order-result-status')).toBeVisible()
  await expect(page.getByTestId('order-result-status')).toContainText('APROVADO')

});
//remover order result e order status
//no codigo
//autoamtizar com nova busca
//subir para o git
//comentar e colocar para Papito




