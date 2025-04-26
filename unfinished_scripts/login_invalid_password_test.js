// TEST CASE: Login with an invalid password
// Remove import and async/await syntax if running in a browser environment

import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  try {
    // Navigate to the login page
    await page.goto('https://demo.daktech.au/');
    console.log('Navigated to the login page');

    // Enter the username and click "Next"
    await page.type('#username', 'hexonhartley.jimenez@my.jcu.edu.au');
    await page.click('button[type="submit"]');
    console.log('Entered username and clicked Next');

    // Wait for navigation to the password screen
    await page.waitForSelector('#password', { timeout: 10000 });
    console.log('Password field loaded');

    // Enter an incorrect password and click "Sign In"
    await page.type('#password', 'wrong_password');
    await page.click('button[type="submit"]');
    console.log('Entered password and clicked Sign In');

    // Wait for either login success or failure
    const loginFailedSelector = '.error-message'; // Update with the actual selector for the error message
    const loginSuccessUrl = 'https://demo.daktech.au/dashboard'; // Update with the actual success URL

    try {
      // Check for login failure indicator
      await page.waitForSelector(loginFailedSelector, { timeout: 5000 });
      console.log('Login failed: Invalid credentials');
    } catch {
      // If no failure indicator, check for successful redirection
      const currentUrl = page.url();
      if (currentUrl === loginSuccessUrl) {
        console.log('Login successful');
      } else {
        console.log('Unexpected behavior: Neither success nor error message detected');
      }
    }
  } catch (error) {
    console.error('Login test encountered an error:', error);
  } finally {
    await browser.close();
    console.log('Browser closed');
  }

})();
