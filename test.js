const puppeteer = require('puppeteer');
const assert = require('assert');

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
(async () => {
    const browser = await puppeteer.launch({
        headless: false ,
        //args: ['--enable-cache'] , // 禁用緩存
        //args: ['--start-fullscreen'], //全螢幕
        //args:['--window-size=1920,1080'],//設定螢幕解析度
        defaultViewport :null //關掉預設小窗口
    });

    const page = await browser.newPage();
    // await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36');

    await page.goto('https://test-agent.zestplay.co/login',{waitUntil:"domcontentloaded"});

    //await page.goto('https://test-agent.zestplay.co/login',{timeout:60000});
    //await page.click('#nav > div > div:nth-child(2) > ul:nth-child(1) > li:nth-child(2) > a > span')
    await page.waitForSelector('#root > div > div > div > div > form > div > div:nth-child(4) > button', { timeout: 60000 })
    await page.type('#account', 'admin');
    await page.type('#password', 'aaaa1234');
    await page.click("#root > div > div > div > div > form > div > div:nth-child(4) > button")
    const accountNameSelector = '#root > div > div > header > div._icon_iyfbn_38.ml-auto.flex.items-center.justify-center > div.ml-4.cursor-pointer.font-bold > button > span.ml-1';
    await page.waitForSelector(accountNameSelector, { timeout: 60000 })
    let loginSuccess = false;

    try {
        const accountName = await page.$eval(accountNameSelector, element => element.textContent.trim());
        // 驗證登入成功
        assert.equal(accountName.toLowerCase(), 'admin222', '登入失敗！');
        console.log('登入成功！');
        loginSuccess = true;
    } catch (error) {
        console.log('登入失敗！進行截圖...');
        await delay(5000);
        await page.screenshot({ path: 'login_failure.png' });
    }

    if (loginSuccess) {
        // 如果登入成功，執行你想要的其他操作
    }

    await browser.close();

    // // 驗證登入成功
    // assert.equal(accountName.toLowerCase(), 'admin', '登入失敗！');
    // console.log('登入成功！');

    // await page.waitForSelector('#root > div > div > div > div > main > div.ant-row.ant-row-center.css-1qfezbu > div:nth-child(1) > div > div > div > h2.text-3xl.my-0',{ timeout: 60000 })
    // await delay(5000)
    // await page.screenshot({path: 'vic0508.png'});
    // await browser.close();
    // 驗證登入成功

})();

