const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5173');
  await page.waitForTimeout(2000); 
  await page.screenshot({ path: '/Users/hypynesia/Documents/26-dashboard-finance/apps/web/screenshot.png', fullPage: true });
  await browser.close();
})();
