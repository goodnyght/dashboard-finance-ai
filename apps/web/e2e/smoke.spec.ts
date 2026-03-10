import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
    await page.goto('/');
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/FinanceCorp/);
});

test('login page loading', async ({ page }) => {
    await page.goto('/login');
    // Expect the page to have a login header
    await expect(page.getByRole('heading', { name: /Welcome Back/i })).toBeVisible();
});
