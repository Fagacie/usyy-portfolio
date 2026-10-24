import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const routes = ['/', '/work', '/about', '/research', '/awards', '/contact'];

for (const route of routes) {
  test('automated accessibility scan: ' + route, async ({ page }) => {
    await page.goto(route);
    const results = await new AxeBuilder({ page: page as unknown as ConstructorParameters<typeof AxeBuilder>[0]['page'] }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
    const summary = results.violations.map(({ id, impact, help }) => ({ id, impact, help }));
    expect(results.violations, JSON.stringify(summary, null, 2)).toEqual([]);
  });
}
