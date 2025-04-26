

async function login(page) {
  try {
    // Navigate to the login page
    await page.goto('https://demo.daktech.au/', { waitUntil: 'networkidle2' });

    // Wait for the username field to load and input the username
    await page.waitForSelector('#username', { visible: true });
    await page.type('#username', process.env.TEST_USERNAME);

    // Wait for and click the submit button
    await page.waitForSelector('button[type="submit"]');
    await page.click('button[type="submit"]');

    // Wait for the password field to load and input the password
    await page.waitForSelector('#password', { visible: true });
    await page.type('#password', process.env.TEST_PASSWORD);

    // Click the login button
    await page.waitForSelector('button[type="submit"]');
    await page.click('button[type="submit"]');

    // Wait for navigation to complete
    await page.waitForNavigation({ waitUntil: 'networkidle2' });

    // Navigate to confirm login
    await page.goto('https://demo.daktech.au/', { waitUntil: 'networkidle2' });
    console.log('Login successful!');

    // Save Authentication Cookies
    const cookies = await page.cookies();
    const authTokenCookie = cookies.find(cookie => cookie.name === 'authToken');
    if (authTokenCookie) {
      console.log('Auth Token:', authTokenCookie.value);
      await fs.writeFile('authToken.txt', authTokenCookie.value);
      console.log('Auth token saved to authToken.txt');
    } else {
      console.error('Auth token cookie not found.');
    }
  } catch (error) {
    console.error('Error during login:', error);
    throw error; // Propagate the error to run_tests.js
  }
}

export default login;
