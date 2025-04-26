/* Response for Question 1: create a puppeteer test script file in javascript that logs in using this website. */
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.goto('https://examplewebsite.com');
  
  await page.type('#username', 'your_username');
  await page.click('button[type="submit"]');
  
  // Wait for the next page to load after submitting the login form
  await page.waitForNavigation();
  
  // Verify if the login was successful by checking for a specific element on the next page
  const successMessage = await page.$('.success-message');
  
  if (successMessage) {
    console.log('Login successful!');
  } else {
    console.log('Login failed.');
  }
  
  await browser.close();
})();