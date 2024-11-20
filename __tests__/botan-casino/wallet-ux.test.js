// 指定跑哪一個檔案 npx jest __tests__/xxxxxx.test.js
const puppeteer = require('puppeteer');
const assert = require('assert');

let browser;
let page;
jest.setTimeout(60000);

beforeAll(async () => {

  browser = await puppeteer.launch({
    headless: false, // 设置为 true 则在无头模式下运行测试
    defaultViewport: null // 关闭默认视窗
  });
  page = await browser.newPage();
  await page.goto('https://dev.botan888.co/casino/home?modal=auth&tab=login', { waitUntil: "domcontentloaded" });
  await page.waitForSelector('#validateOnly_account', { timeout: 60000 });

  // 登录
  await page.type('#validateOnly_account', '0999111115');
  await page.type('#validateOnly_password', 'aaaa1234');
  await page.click("#validateOnly > div.ant-form-item.mb-0 > div > div > div > div > button");
  await page.waitForSelector('#validateOnly > div.ant-form-item.mb-0 > div > div > div > div > button', { timeout: 60000 });
});

afterAll(async () => {
  await browser.close();
});

describe('檢查wallet', () => {
  test('檢查左側清單存在balance', async () => {
    await page.goto('https://dev.botan888.co/wallet/balance', { waitUntil: "domcontentloaded" });
    const xpath = "//*[text()='ยอดคงเหลือ']";
    await new Promise(resolve => setTimeout(resolve, 1000));
    await page.evaluate((xpath) => {
        const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (!element) {
          throw new Error(`Element with XPath ${xpath} not found.`);
        }
    }, xpath);
    expect(xpath).toBeTruthy(); // 检查按钮是否存在
  });
  test.skip('檢查左側清單存在帳戶管理', async () => {
    //await page.goto('https://dev.botan888.co/wallet/balance', { waitUntil: "domcontentloaded" });
    const xpath = "//*[text()='การจัดการบัญชี']";
    await new Promise(resolve => setTimeout(resolve, 1000));
    await page.evaluate((xpath) => {
        const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (!element) {
          throw new Error(`Element with XPath ${xpath} not found.`);
        }
    }, xpath);
    expect(xpath).toBeTruthy(); // 检查按钮是否存在
  });
  test('檢查左側清單存在存錢', async () => {
    //await page.goto('https://dev.botan888.co/wallet/balance', { waitUntil: "domcontentloaded" });
    const xpath = "//*[text()='ฝากเงิน']";
    await new Promise(resolve => setTimeout(resolve, 1000));
    await page.evaluate((xpath) => {
        const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (!element) {
          throw new Error(`Element with XPath ${xpath} not found.`);
        }
    }, xpath);
    expect(xpath).toBeTruthy(); // 检查按钮是否存在
  });
  test('檢查左側清單存在提款', async () => {
    //await page.goto('https://dev.botan888.co/wallet/balance', { waitUntil: "domcontentloaded" });
    const xpath = "//*[text()='ถอนเงิน']";
    await new Promise(resolve => setTimeout(resolve, 1000));
    await page.evaluate((xpath) => {
        const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (element) { 
            element.click();//點擊找到的按鈕
        } else {
            throw new Error(`Element with XPath ${xpath} not found.`);
        }
    }, xpath);
    expect(xpath).toBeTruthy(); // 检查按钮是否存在
  });
  test('檢查該頁面標題', async () => {
    await page.waitForSelector('.flex.items-center.gap-2.text-lg', { timeout: 60000 });
    const WelcomeText = await page.$eval('.flex.items-center.gap-2.text-lg', element => element.textContent.trim());
    assert.equal(WelcomeText, 'กระเป๋า', 'Admin setting element text is incorrect');
      // 等待彈窗並加上時間讓他完全顯示
    await new Promise(resolve => setTimeout(resolve, 2000)); 
  });
  // test('檢查該頁面標題-版本2', async () => {
  //   const xpath = '//div[contains(@class, "flex items-center gap-2 text-lg")]';

  //   // 等待元素出現
  //   await page.waitForXPath(xpath, { timeout: 60000 });
    
  //   // 使用 XPath 查找元素
  //   const [elementHandle] = await page.$x(xpath);
  //   const WelcomeText = await page.evaluate(element => element.textContent.trim(), elementHandle);
    
  //   // 驗證文字內容
  //   assert.equal(WelcomeText, 'บัญชีคุณaaaa', 'Admin setting element text is incorrect');
  // });
  test('檢查左側清單存在投注記錄', async () => {
    //await page.goto('https://dev.botan888.co/wallet/balance', { waitUntil: "domcontentloaded" });
    const xpath = "//*[text()='ประวัติการเดิมพัน']";
    await new Promise(resolve => setTimeout(resolve, 1000));
    await page.evaluate((xpath) => {
        const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (!element) {
          throw new Error(`Element with XPath ${xpath} not found.`);
        }
    }, xpath);
    expect(xpath).toBeTruthy(); // 检查按钮是否存在
  });
  test('檢查左側清單存在交易記錄', async () => {
    //await page.goto('https://dev.botan888.co/wallet/balance', { waitUntil: "domcontentloaded" });
    const xpath = "//*[text()='ประวัติการทำธุรกรรม']";
    await new Promise(resolve => setTimeout(resolve, 1000));
    await page.evaluate((xpath) => {
        const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (!element) {
          throw new Error(`Element with XPath ${xpath} not found.`);
        }
    }, xpath);
    expect(xpath).toBeTruthy(); // 检查按钮是否存在
  });
  test('檢查左側清單存在派獎記錄', async () => {
    //await page.goto('https://dev.botan888.co/wallet/balance', { waitUntil: "domcontentloaded" });
    const xpath = "//*[text()='ประวัติการรับโบนัส']";
    await new Promise(resolve => setTimeout(resolve, 1000));
    await page.evaluate((xpath) => {
        const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (!element) {
          throw new Error(`Element with XPath ${xpath} not found.`);
        }
    }, xpath);
    expect(xpath).toBeTruthy(); // 检查按钮是否存在
  });
  
});