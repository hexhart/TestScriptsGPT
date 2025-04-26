

async function logout(page) {
  try {
    // Navigate to a known logged-in page
    await page.goto('https://demo.daktech.au/dashboards/view', { waitUntil: 'networkidle2' });

    // Wait for the user profile menu icon to appear
    await page.waitForSelector('.fa-user', { visible: true });

    // Click the profile menu icon to open the dropdown menu
    await page.click('.fa-user');

    // Wait for the "Sign Out" button to appear (using button text or title)
    await page.waitForXPath("//a[contains(text(), 'Sign out')]", { visible: true });

    // Click the "Sign Out" button
    const signOutButton = await page.$x("//a[contains(text(), 'Sign out')]");
    if (signOutButton.length > 0) {
        await signOutButton[0].click();
    } else {
        throw new Error("Sign Out button not found.");
    }

    // Wait for navigation to complete after logout
    await page.waitForNavigation({ waitUntil: 'networkidle2' });

    // Confirm logout by checking the URL or an element on the login page
    if (page.url().includes('/?redirect=%2Fresources%2Fhome')) {
      console.log('Logout successful!');
    } else {
      console.error('Logout failed or unexpected page after logout.');
    }
  } catch (error) {
    console.error('Error during logout:', error);
    throw error; // Propagate the error to run_tests.js
  }
}

export default logout;