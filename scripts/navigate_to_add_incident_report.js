
async function navigate_to_add_incident_report(page) {
  try {
    // Navigate to the page
    await page.goto('https://demo.daktech.au/dashboards/view'); // Replace with your target URL

    // Click the "Add Report" button
    await page.waitForSelector('.btn.btn-sm.btn-default.dropdown-toggle[data-toggle="dropdown"]');
    await page.click('.btn.btn-sm.btn-default.dropdown-toggle[data-toggle="dropdown"]');

    // Click the "New Incident Report" link
    await page.waitForSelector('a[href="/incidents/add?incident_template_id=1"]');
    await page.click('a[href="/incidents/add?incident_template_id=1"]');
  
    // await page.waitForSelector('#confirmationMessage'); // Adjust selector as needed
    //   console.log('Incident report submitted successfully.');
    } catch (error) {
      console.error('An error occurred:', error);
  
}}

export default navigate_to_add_incident_report