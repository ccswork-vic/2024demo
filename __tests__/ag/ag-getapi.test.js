const puppeteer = require('puppeteer');
const assert = require('assert');
const fetch = require('node-fetch');

let browser;
let page;
let token;

jest.setTimeout(60000);

beforeAll(async () => {
    browser = await puppeteer.launch({
        headless: false, // 如果 true  就不開啟瀏覽器測試，直接跑完
        defaultViewport: null // 關閉默認小視窗
    });
    page = await browser.pages().then(pages => pages[0]);
    await page.goto('https://test-agent.zestplay.co/login', { waitUntil: "domcontentloaded" });
    await page.waitForSelector('#root > div > div > div > div > form > div > div:nth-child(4) > button', { timeout: 60000 });

    // 輸入帳密
    await page.type('#account', 'vicag');
    await page.type('#password', 'aaaa1234');

    // 設置請求攔截器
    await page.setRequestInterception(true);
    page.on('request', (request) => {
        request.continue();
    });
    page.on('response', async (response) => {
        const url = response.url();
        const requestMethod = response.request().method();
        if (url === 'https://test-admin-serv.zestplay.co/api/postLogin' && requestMethod === 'POST') {
            try {
                const data = await response.json();
                token = data.ticket;
                console.log('Token captured:', token);
            } catch (err) {
                console.error('Error capturing token:', err);
            }
        }
    });

    // 點登入
    await page.click("#root > div > div > div > div > form > div > div:nth-child(4) > button");
    await page.waitForSelector('#root > div > div > header > div._icon_iyfbn_38.ml-auto.flex.items-center.justify-center > div.ml-4.cursor-pointer.font-bold > button > span.ml-1', { timeout: 60000 });
});

afterAll(async () => {
    await browser.close();
});
test.only('點擊會員清單', async () => {
    const xpathForsearch = "//*[text()='會員管理']";

    // 等待元素出現
    await page.waitForFunction((xpath) => {
        const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
        return result.singleNodeValue !== null;
    }, { timeout: 60000 }, xpathForsearch);

    // 點元素
    await page.evaluate((xpath) => {
        const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
        const element = result.singleNodeValue;
        if (element) {
            element.click();
        } else {
            throw new Error(`Element with XPath ${xpath} not found.`);
        }
    }, xpathForsearch);

    // 等待submenu打開
    await new Promise(resolve => setTimeout(resolve, 1000)); // 等待1秒鐘，等待submenu打開

    const xpath = "//*[text()='會員清單']";
    await new Promise(resolve => setTimeout(resolve, 1000));
    await page.evaluate((xpath) => {
        const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (element) {
            element.click();
        } else {
            throw new Error(`Element with XPath ${xpath} not found.`);
        }
    }, xpath);
    await new Promise(resolve => setTimeout(resolve, 1000));
    const memberlist = await page.$eval('#root > div > div > div > div > main > div > div:nth-child(1) > div > div > h2', element => element.textContent.trim());
    expect(memberlist).toBeTruthy();
    assert.equal(memberlist, '會員清單', 'memberlist text is incorrect');
})
test.only('檢查麵包屑', async () => {
    const xpath = "//*[text()='會員清單']";
    await new Promise(resolve => setTimeout(resolve, 1000));
    await page.evaluate((xpath) => {
        const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (element) {
            element.click();
        } else {
            throw new Error(`Element with XPath ${xpath} not found.`);
        }
    }, xpath);
    await new Promise(resolve => setTimeout(resolve, 1000));
    const Breadcrumbs = await page.$eval('#root > div > div > div > div > nav > ol', element => element.textContent.trim());
    expect(Breadcrumbs).toBeTruthy();
    assert.equal(Breadcrumbs, '總覽/會員管理/會員清單', 'Breadcrumbs text is incorrect');
    expect(Breadcrumbs).toContain('總覽');
    expect(Breadcrumbs).toContain('會員管理');
    expect(Breadcrumbs).toContain('會員清單');
})
test('檢查輸入框預設文字', async () => {
    const xpath = "//*[text()='會員清單']";
    await new Promise(resolve => setTimeout(resolve, 1000));
    await page.evaluate((xpath) => {
        const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (element) {
            element.click();
        } else {
            throw new Error(`Element with XPath ${xpath} not found.`);
        }
    }, xpath);
    await new Promise(resolve => setTimeout(resolve, 1000));
    const placeholderText = await page.$eval('input.ant-input.ant-input-lg.css-1r287do', element => element.getAttribute('placeholder'));
    expect(placeholderText).toBeTruthy();
    assert.equal(placeholderText, '請輸入指定帳號', 'playidsearch text is incorrect');
})
test('輸入不存在玩家id，檢查錯誤提示', async () => {
    const xpath = "//*[text()='會員清單']";
    await new Promise(resolve => setTimeout(resolve, 1000));
    await page.evaluate((xpath) => {
        const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (element) {
            element.click();
        } else {
            throw new Error(`Element with XPath ${xpath} not found.`);
        }
    }, xpath);
    await new Promise(resolve => setTimeout(resolve, 1000));
    await page.click("#root > div > div > div > div > main > div > div:nth-child(1) > div > div > form > div > div:nth-child(2) > div > div > div > div > div > span");
    await page.type('#fullAccount', 'jon55661314444');
    await page.click("#root > div > div > div > div > main > div > div:nth-child(1) > div > div > form > div > div:nth-child(3) > div > div > div > div > div > button");
    await new Promise(resolve => setTimeout(resolve, 1000));
    const nouser = await page.$eval('body > div.ant-message.ant-message-top.css-1r287do > div > div > div > div > span:nth-child(2)', element => element.textContent.trim());
    expect(nouser).toBeTruthy();
    assert.equal(nouser, 'Invalid DownLine Attribution', 'nouser text is incorrect');
})
test.only('輸入存在玩家id，並檢查使用者幣別，對比api回傳值', async () => {
    const xpath = "//*[text()='會員清單']";
    await new Promise(resolve => setTimeout(resolve, 1000));
    await page.evaluate((xpath) => {
        const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (element) {
            element.click();
        } else {
            throw new Error(`Element with XPath ${xpath} not found.`);
        }
    }, xpath);
    await new Promise(resolve => setTimeout(resolve, 1000));

    await page.click("#root > div > div > div > div > main > div > div:nth-child(1) > div > div > form > div > div:nth-child(2) > div > div > div > div > div > span > span > span > span > svg > path");
    await page.click("#root > div > div > div > div > main > div > div:nth-child(1) > div > div > form > div > div:nth-child(2) > div > div > div > div > div > span");
    await page.type('#fullAccount', 'vic032523');
    await page.click("#root > div > div > div > div > main > div > div:nth-child(1) > div > div > form > div > div:nth-child(3) > div > div > div > div > div > button");
    await new Promise(resolve => setTimeout(resolve, 1000));

    const userdata = await page.$eval('#root > div > div > div > div > main > div > div:nth-child(2) > div > div:nth-child(2) > div > div > div.ant-table-wrapper.css-1r287do > div > div > div > div > div > table > tbody > tr.ant-table-row.ant-table-row-level-0 > td:nth-child(4) > span > span', element => element.textContent.trim());
    expect(userdata).toBeTruthy();
    assert.equal(userdata, 'RMB', 'userdata element text is incorrect');

    // 發送API請求
    const response = await fetch('https://test-admin-serv.zestplay.co/api/account/getAccountInfo?account=vic032523', {
        method: 'GET', // 根據API需求調整HTTP方法
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    const apiData = await response.json();
    // 印出API返回的數據
    console.log(apiData);

    // 確定accountInfo和currencyList存在
    expect(apiData.accountInfo).toBeTruthy();
    expect(apiData.accountInfo.currencyList).toBeTruthy();
    expect(apiData.accountInfo.currencyList.length).toBeGreaterThan(0);

    // 拿API返回的Currency
    const apiCurrency = apiData.accountInfo.currencyList[0].currency;
    expect(apiCurrency).toBeTruthy();
    console.log(apiCurrency);
    assert.equal(apiCurrency, 'RMB', 'API currency data is incorrect');

    // 比較API返回的值與頁面上的值
    assert.equal(userdata, apiCurrency, 'Page display currency does not match API currency');
})
test.only('檢查頁面顯示的餘額與API返回值是否一致', async () => {
    const xpath = "//*[text()='會員清單']";
    await new Promise(resolve => setTimeout(resolve, 1000));
    await page.evaluate((xpath) => {
        const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (element) {
            element.click();
        } else {
            throw new Error(`Element with XPath ${xpath} not found.`);
        }
    }, xpath);
    await new Promise(resolve => setTimeout(resolve, 1000));

    await page.click("#root > div > div > div > div > main > div > div:nth-child(1) > div > div > form > div > div:nth-child(2) > div > div > div > div > div > span > span > span > span > svg > path");
    await page.click("#root > div > div > div > div > main > div > div:nth-child(1) > div > div > form > div > div:nth-child(2) > div > div > div > div > div > span");
    await page.type('#fullAccount', 'vic032523');
    await page.click("#root > div > div > div > div > main > div > div:nth-child(1) > div > div > form > div > div:nth-child(3) > div > div > div > div > div > button");
    await new Promise(resolve => setTimeout(resolve, 1000));

    // 發送API請求
    const response = await fetch('https://test-admin-serv.zestplay.co/api/account/getAccountInfo?account=vic032523', {
        method: 'GET', // 根據API需求調整HTTP方法
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    const apiData = await response.json();
    // 印出API返回的數據
    console.log(apiData);

    // 確定accountInfo和currencyList存在
    expect(apiData.accountInfo).toBeTruthy();
    expect(apiData.accountInfo.currencyList).toBeTruthy();
    expect(apiData.accountInfo.currencyList.length).toBeGreaterThan(0);

    // 拿API返回的Balance
    const apiBalance = apiData.accountInfo.currencyList[0].balance;
    expect(apiBalance).toBeTruthy();
    console.log(apiBalance);

    // 比較API返回的值與頁面上的值
    const pageBalance = await page.$eval('.text-small.text-nowrap .block .plus.my-0', element => element.textContent.trim());
    expect(pageBalance).toBeTruthy();
    console.log(pageBalance);
    // 將API的餘額格式化為與頁面一致的格式
    const formattedApiBalance = `$${parseFloat(apiBalance).toLocaleString('en-US', { minimumFractionDigits: 3 })}`;
    console.log(formattedApiBalance);

    assert.equal(pageBalance, formattedApiBalance, 'Page display balance does not match API balance');
});
