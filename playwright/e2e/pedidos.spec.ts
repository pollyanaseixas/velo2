import { test, expect } from '@playwright/test'

// AAA - Preparar, Agir, Verificar

test('deve consultar um pedido aprovado', async ({ page }) => {
  // Preparar
  await page.goto('http://localhost:5173/')
  await expect(
    page.getByTestId('hero-section')
      .getByRole('heading', { name: 'Velô Sprint' })
  ).toBeVisible()

  await page.getByRole('link', { name: 'Consultar Pedido' }).click()
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido')

  // Agir
  await page.getByRole('textbox', { name: 'Número do Pedido' }).fill('VLO-U32QEM')
  await page.getByRole('button', { name: 'Buscar Pedido' }).click();

  // Verificar
  await expect(page.getByText('VLO-U32QEM')).toBeVisible({timeout: 10000})
  await expect(page.getByText('APROVADO')).toBeVisible()
})
















