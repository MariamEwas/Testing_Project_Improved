import { test, expect } from '@playwright/test';

test.describe('Personal Finance Tracker', () => {
  test('User can login and add a transaction', async ({ page }) => {
    // Navigate to the login page
    await page.goto('http://localhost:5173/login');

    // Verify the login page
    await expect(page).toHaveTitle(/Personal Finance Tracker/);
    await expect(page.locator('.login-heading')).toHaveText('Login');

    // Fill in login credentials
    await page.fill('#email', 'mariam@example.com');
    await page.fill('#password', 'password123');

    // Submit the login form
    await page.click('.login-button');

    // Wait for navigation to dashboard
    await page.waitForURL('**/dashboard');

    await page.click('.menu-icon'); // Simulate click on the menu icon to open the sidebar

    // Navigate to transactions page
    await page.click('.sidebar-item:has-text("Transactions")');

    // Wait for navigation to transactions page
    await page.waitForURL('**/transactions');

    // Verify the transactions page
    await expect(page.locator('h1')).toHaveText('Transaction Management');

    // Fill in the add transaction form
    await page.selectOption('select[name="type"]', 'expense');
    await page.selectOption('select[name="category"]', 'entertainment'); // Household Expenses
    await page.fill('input[name="amount"]', '50');
    await page.fill('input[name="date"]', '2023-12-22'); // Use today's date or adjust as needed
    await page.fill('input[name="description"]', 'Groceries');

    // Submit the add transaction form
    await page.click('.submit-btn');

    // Verify success message
    await expect(page.locator('.success-message')).toHaveText('Transaction added successfully!');

    // Optional: Verify the new transaction appears in the list
    // This assumes you have a way to identify newly added transactions
    // await expect(page.locator('.transaction-list')).toContainText('Groceries');
    await page.click('.menu-icon'); // Simulate click on the menu icon to open the sidebar

   // Click the logout button
   await page.click('.sidebar-item:has-text("Logout")');

   // Wait for the confirmation dialog and click "Yes"
   await page.waitForSelector('.confirmation-dialog');
   await page.click('button:has-text("Yes")');

   // Verify redirect to login page
   await expect(page).toHaveURL('/login');
  });
});

