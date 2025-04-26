import puppeteer from 'puppeteer';
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });
import login from './scripts/login_test.js'; // Import the login script
import navigate_to_add_incident_report from './scripts/navigate_to_add_incident_report.js'; // Import navigation script
import fill_incident_test from './scripts/fill_incident_test.js'; // Import fill incident script
import navigate_to_add_event from './scripts/navigate_to_add_event.js';
import fill_event_test from './scripts/fill_event_test.js';
import fs from 'fs';


// Define scripts as a list
const scripts = [login, navigate_to_add_incident_report, fill_incident_test, navigate_to_add_event, fill_event_test];

(async () => {
  // Initialize the browser and page
  const browser = await puppeteer.launch({ headless: false }); // Set headless to false for debugging
  const page = await browser.newPage();

  try {
    // Iterate through each script in the list
    for (const [index, script] of scripts.entries()) {
      console.log('Running script:', script.name); // Log script name for clarity
      await script(page); // Execute the script with the same page instance

      // Save the HTML content after the script finishes
      const htmlContent = await page.content();
      const filePath = `html/page_${index + 1}.html`; // Save to "html" directory
      fs.writeFileSync(filePath, htmlContent);
      console.log(`HTML content saved to ${filePath}`);
    }

    console.log('All scripts executed successfully!');
  } catch (error) {
    console.error('Error executing scripts:', error);
  } finally {
    // Ensure the browser is closed
    await browser.close();
    console.log('Browser closed. All tests completed.');
  }
})();
