
async function navigate_to_add_event(page) {    
    await page.goto('https://demo.daktech.au/dashboards/view');

    // Click on "My Upcoming Events"
    await page.click('a[href="/events/add"]');
    await page.waitForSelector('.card-title'); // Verify that the new section loads

    console.log("Navigation Test Passed!");
}

export default navigate_to_add_event