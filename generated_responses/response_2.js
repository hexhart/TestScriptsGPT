/* Response for Question 2: create a puppeteer test script file in javascript that logs out from this website. */
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.goto('URL_OF_THE_WEBSITE');
  
  // Perform actions to log out, for example:
  await page.click('LOGOUT_BUTTON_SELECTOR');

  // Wait for the logout process to complete
  await page.waitForNavigation();

  // Log out successful
  console.log('Logout successful');
  
  await browser.close();
})();