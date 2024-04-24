const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.newegg.com');
    await page.screenshot({path: 'newegg.png'});

    await browser.close();
})();