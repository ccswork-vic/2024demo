const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.google.com.tw');
    await page.screenshot({path: '2.png'});

    await browser.close();
})();