import { test, expect } from '@playwright/test';

const routes = [
  '/',
  '/work',
  '/about',
  '/research',
  '/awards',
  '/contact',
  '/projects/psm-e-learning',
  '/projects/iot-monitoring',
  '/projects/pku-management',
  '/projects/weatherhub',
  '/projects/masakjerr',
  '/projects/elite-soccer'
];

for (const route of routes) {
  test('route loads with a primary heading: ' + route, async ({ page }) => {
    const response = await page.goto(route);
    expect(response?.ok()).toBeTruthy();
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('main h1').first()).toBeVisible();
    await expect(page.getByRole('navigation', { name: 'Primary navigation' })).toBeAttached();
  });
}

test('project filters and search update the visible results', async ({ page }) => {
  await page.goto('/work');
  const cards = page.locator('[data-project-card]');
  await expect(cards).toHaveCount(6);

  await page.getByRole('button', { name: 'IoT & hardware' }).click();
  await expect(cards.filter({ visible: true })).toHaveCount(1);
  await expect(cards.filter({ hasText: 'Smart Campus Security' })).toBeVisible();

  await page.getByRole('button', { name: 'All projects' }).click();
  await page.locator('[data-project-search]').fill('JSP');
  await expect(cards.filter({ visible: true })).toHaveCount(3);
  await expect(page.locator('[data-project-results]')).toContainText('3 projects shown');
});

test('mobile navigation is readable and pages do not overflow at common phone widths', async ({ page }) => {
  for (const width of [320, 360, 390, 430]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto('/work');
    const dock = page.getByRole('navigation', { name: 'Mobile primary navigation' });
    await expect(dock).toBeVisible();
    await expect(dock.getByRole('link', { name: 'Projects' })).toBeVisible();
    const dimensions = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      document: document.documentElement.scrollWidth
    }));
    expect(dimensions.document, 'horizontal overflow at ' + width + 'px').toBeLessThanOrEqual(dimensions.viewport + 1);
  }
});

test('résumé action keeps the canonical route', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('a[href="/resume"]').first()).toHaveAttribute('href', '/resume');
});
