const puppeteer = require('puppeteer');
const assert = require('assert');
const fs = require('fs/promises');

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null // 關掉預設小窗口
    });

    const page = await browser.newPage();
    await page.goto('https://test-agent.zestplay.co/login', { waitUntil: "domcontentloaded" });
    await page.waitForSelector('#root > div > div > div > div > form > div > div:nth-child(4) > button', { timeout: 60000 });

    const accountsJson = await fs.readFile('accounts.json', 'utf-8');
    const accounts = JSON.parse(accountsJson).accounts;

    for (const account of accounts) {
        const { username, password } = account;

        // 等待帳號輸入框可見
        await page.waitForSelector('#account');

        // 輸入帳號
        await page.type('#account', username);

        // 等待密碼輸入框可見
        await page.waitForSelector('#password');

        // 輸入密碼
        await page.type('#password', password);

        // 點擊登入按鈕
        await page.click("#root > div > div > div > div > form > div > div:nth-child(4) > button");

        // 等待登入成功
        const accountNameSelector = '#root > div > div > header > div._icon_iyfbn_38.ml-auto.flex.items-center.justify-center > div.ml-4.cursor-pointer.font-bold > button > span.ml-1';
        await page.waitForSelector(accountNameSelector, { timeout: 60000 });

        let loginSuccess = false;

        try {
            const accountName = await page.$eval(accountNameSelector, element => element.textContent.trim());
            // 驗證登入成功
            assert.equal(accountName.toLowerCase(), username.toLowerCase(), '登入失敗！');
            console.log(`${username} 登入成功！`);
            loginSuccess = true;
        } catch (error) {
            console.log(`${username} 登入失敗！進行截圖...`);
            await delay(5000);
            await page.screenshot({ path: `${username}_login_failure.png` });
            continue; // 繼續下一個帳號驗證
        }

        if (loginSuccess) {
            // 點擊登出按鈕
            await page.click("#root > div > div > header > div._icon_iyfbn_38.ml-auto.flex.items-center.justify-center > span > i");

            // 等待帳號輸入框再次可見
            await page.waitForSelector('#account');
        }
    }

    await browser.close();
})();
