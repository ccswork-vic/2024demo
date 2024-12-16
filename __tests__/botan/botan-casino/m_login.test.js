const puppeteer = require('puppeteer');
const assert = require('assert');
const closeDialogIfExists = require('../../utils/closeDialog');


// 加載內置的設備描述
const { KnownDevices } = require('puppeteer');
const iPhoneX = KnownDevices['Nexus 7'];
console.log(Object.keys(KnownDevices));
let browser;
let page;
jest.setTimeout(60000);

beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: false, // 開啟瀏覽器視窗
    defaultViewport: null, // 禁用默認視窗設置
  });
  
  page = await browser.newPage();
  
  // 模擬 iPhone X 設備
  await page.emulate(iPhoneX);
  
  // 加載目標頁面
  await page.goto('https://dev.botan888.co/casino/home?modal=auth&tab=login', { waitUntil: "domcontentloaded" });
  
  // 等待輸入框出現
  await page.waitForSelector('#validateOnly_account', { timeout: 60000 });

  // 登录
  await page.type('#validateOnly_account', '0999111119');
  await page.type('#validateOnly_password', 'aaaa1234');
  await page.click("#validateOnly > div.ant-form-item.mb-0 > div > div > div > div > button");
  await page.waitForSelector('#validateOnly > div.ant-form-item.mb-0 > div > div > div > div > button', { timeout: 60000 });
  
  // 關閉彈窗
  await closeDialogIfExists(page);
});

afterAll(async () => {
  await browser.close();
});


describe('確認登入成功', () => {
    test('檢查登入成功彈窗', async () => {
      await page.waitForSelector('div > div > div > div > div.ant-notification-notice-description', { timeout: 60000 });
      const WelcomeText = await page.$eval('div > div > div > div > div.ant-notification-notice-description', element => element.textContent.trim());
      assert.equal(WelcomeText, 'ยินดีต้อนรับ 660999111119', 'text is incorrect');
    });
  });