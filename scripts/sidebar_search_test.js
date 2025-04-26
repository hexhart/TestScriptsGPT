
async function sidebar(page) {
    // Test Sidebar Toggle
    console.log('Testing sidebar toggle...');
    const sidebarToggleSelector = '[data-widget="pushmenu"]'; // Update based on your HTML structure
    const sidebarSelector = '.main-sidebar'; // Update with the selector for the sidebar

    try {
        // Wait for the sidebar toggle button to appear
        await page.waitForSelector(sidebarToggleSelector, { timeout: 5000 });
        console.log('Sidebar toggle button is visible.');

        // Click the toggle button
        await page.click(sidebarToggleSelector);
        console.log('Clicked the sidebar toggle button.');

        // Wait for the sidebar to be visible
        await page.waitForSelector(sidebarSelector, { timeout: 5000 });
        console.log('Sidebar is now open.');
    } catch (error) {
        console.error('Failed to open the sidebar:', error.message);
        await page.screenshot({ path: 'debug-sidebar-error.png' });
        return;
    }

    // Test Search Bar
    console.log('Testing search bar...');
    const searchInputSelector = '#sidebar-search'; // Update with the actual selector of the search bar
    const searchResultSelector = '.search-result-button'; // Update with the actual selector for search results

    try {
        // Wait for the search bar to appear
        await page.waitForSelector(searchInputSelector, { timeout: 5000 });

        // Clear the search bar
        await page.evaluate((selector) => {
            const input = document.querySelector(selector);
            input.value = ''; // Clear the input field
        }, searchInputSelector);
        console.log('Cleared the search bar.');

        // Type into the search bar
        await page.type(searchInputSelector, 'Dashboard');
        console.log('Typed into search bar.');

        // Wait for search results to appear
        await page.waitForSelector(searchResultSelector, { timeout: 5000 });
        console.log('Search results appeared.');

        // Get all search results
        const searchResults = await page.$$(searchResultSelector);
        console.log(`Found ${searchResults.length} search results.`);

        if (searchResults.length > 0) {
            // Log the inner text of each result to debug selectors
            for (let i = 0; i < searchResults.length; i++) {
                const resultText = await page.evaluate(el => el.textContent, searchResults[i]);
                console.log(`Result ${i + 1}: ${resultText.trim()}`);
            }

            // Scroll into view of the first result to ensure visibility
            await page.evaluate((selector) => {
                document.querySelector(selector).scrollIntoView();
            }, searchResultSelector);

            // Ensure the first result is visible and enabled
            const isClickable = await page.evaluate((selector) => {
                const element = document.querySelector(selector);
                return element && !element.disabled && element.offsetParent !== null;
            }, searchResultSelector);

            if (!isClickable) {
                console.error('The first search result is not clickable.');
                await page.screenshot({ path: 'debug-not-clickable.png' });
                return;
            }

            // Click on the first search result
            await searchResults[0].click();
            console.log('Clicked the first search result.');

            // Wait for navigation or page update
            try {
                await page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 5000 });
                console.log('Navigation successful after clicking the result.');
            } catch (error) {
                console.error('No navigation occurred after clicking the search result.');
            }
        } else {
            console.error('No search results found.');
            await page.screenshot({ path: 'debug-no-results.png' });
        }
    } catch (error) {
        console.error('Search bar test failed:', error.message);
        await page.screenshot({ path: 'debug-search-bar-error.png' });
    }
}


export default sidebar;