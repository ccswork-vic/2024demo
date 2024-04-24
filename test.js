const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: false ,
        args: ['--enable-cache'] // 禁用緩存
        //args: ['--start-fullscreen']
    });

    const page = await browser.newPage();
   // await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36');

    await page.goto('https://test-agent.zestplay.co/login',{timeout:60000});
    //await page.click('#nav > div > div:nth-child(2) > ul:nth-child(1) > li:nth-child(2) > a > span')
    await page.waitForSelector('#root > div > div > div > div > form > div > div:nth-child(4) > button', { timeout: 60000 })
    await page.type('#account', 'admin');
    await page.type('#password', 'aaaa1234');
    await page.click("#root > div > div > div > div > form > div > div:nth-child(4) > button")
    await page.waitForSelector('#root > div > div > div > div > main > div.ant-row.ant-row-center.css-1qfezbu > div:nth-child(1) > div > div > div > h2.text-3xl.my-0',{ timeout: 60000 })

    await page.screenshot({path: 'agent8.png'});
    //await browser.close();
})();

