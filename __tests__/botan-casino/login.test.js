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
  await page.type('#validateOnly_account', '0999111116');
  await page.type('#validateOnly_password', 'aaaa1234');
  await page.click("#validateOnly > div.ant-form-item.mb-0.css-1dwc1ye > div > div > div > div > button");
  await page.waitForSelector('#validateOnly > div.ant-form-item.mb-0.css-1dwc1ye > div > div > div > div > button', { timeout: 60000 });
});

afterAll(async () => {
  await browser.close();
});

describe('確認登入成功', () => {
  test('檢查登入成功彈窗', async () => {
    await page.waitForSelector('div > div > div > div > div.ant-notification-notice-description', { timeout: 60000 });
    const WelcomeText = await page.$eval('div > div > div > div > div.ant-notification-notice-description', element => element.textContent.trim());
    assert.equal(WelcomeText, 'ยินดีต้อนรับ 660999111116', 'Admin setting element text is incorrect');
  });
  test('檢查註冊送活動彈窗', async () => {
    const xpath = "//*[text()='เข้าร่วม']";
    await new Promise(resolve => setTimeout(resolve, 1000));
    await page.evaluate((xpath) => {
        const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (!element) {
          throw new Error(`Element with XPath ${xpath} not found.`);
      }
    }, xpath);
    expect(xpath).toBeTruthy(); // 检查按钮是否存在
    await page.keyboard.press('Escape');
    //assert.equal(PopupbtnText, 'เข้าร่วม', 'Member management element text is incorrect');
  });
  test('檢查活動錢包', async () => {
    const xpath = "//*[text()='กระเป๋าเควส']";
    await new Promise(resolve => setTimeout(resolve, 1000));
    await page.evaluate((xpath) => {
        const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (!element) {
          throw new Error(`Element with XPath ${xpath} not found.`);
        }
    }, xpath);
    expect(xpath).toBeTruthy(); // 检查按钮是否存在
  });
  test('檢查錢包存款入口', async () => {
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
  test('檢查玩家登入icon', async () => {
    await page.waitForSelector('.ant-layout header .ant-btn-default.ant-dropdown-trigger');
    const button = await page.$('.ant-layout header .ant-btn-default.ant-dropdown-trigger');
    expect(button).toBeTruthy(); // 检查按钮是否存在
  });
});