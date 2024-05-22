// 指定跑哪一個檔案 npx jest __tests__/checkwinloss.test.js


const puppeteer = require('puppeteer');
const assert = require('assert');

describe('Login Test', () => {
  let browser;
  let page;

  beforeAll(async () => {
    jest.setTimeout(30000);
    browser = await puppeteer.launch({
      headless: false, // 可選，如果想要在有頭部的模式下運行測試，可以設置為 false
      defaultViewport: null // 關掉預設小窗口
    });
    page = await browser.newPage();
    await page.goto('https://test-agent.zestplay.co/login', { waitUntil: "domcontentloaded" });
    await page.waitForSelector('#root > div > div > div > div > form > div > div:nth-child(4) > button', { timeout: 60000 });
  });

  afterAll(async () => {
    await browser.close();
  });

  test('檢查admin 左邊選單存在管理員設定', async () => {
    await page.type('#account', 'admin');
    await page.type('#password', 'aaaa1234');
    await page.click("#root > div > div > div > div > form > div > div:nth-child(4) > button");
    await page.waitForSelector('#root > div > div > header > div._icon_iyfbn_38.ml-auto.flex.items-center.justify-center > div.ml-4.cursor-pointer.font-bold > button > span.ml-1', { timeout: 60000 });
    const accountName = await page.$eval('#root > div > div > header > div._icon_iyfbn_38.ml-auto.flex.items-center.justify-center > div.ml-4.cursor-pointer.font-bold > button > span.ml-1', element => element.textContent.trim());
    assert.equal(accountName.toLowerCase(), 'admin', 'Login failed for admin');
    await page.waitForSelector('#root > div > div > div > aside > div > div._menu_t2mh1_44 > ul > li:nth-child(1) > div', { timeout: 60000 });
    const adminSettingText = await page.$eval('#root > div > div > div > aside > div > div._menu_t2mh1_44 > ul > li:nth-child(1) > div', element => element.textContent.trim());
    assert.equal(adminSettingText, '管理員設定', 'Admin setting element text is incorrect');

    // 點擊登出按鈕
    await page.click("#root > div > div > header > div._icon_iyfbn_38.ml-auto.flex.items-center.justify-center > span > i");
    // 等待帳號輸入框再次可見
    await page.waitForSelector('#account');
  });
  test('檢查admin 左邊選單存在會員管理', async () => {
    
    await page.type('#account', 'admin');
    await page.type('#password', 'aaaa1234');
    await page.click("#root > div > div > div > div > form > div > div:nth-child(4) > button");
    await page.waitForSelector('#root > div > div > header > div._icon_iyfbn_38.ml-auto.flex.items-center.justify-center > div.ml-4.cursor-pointer.font-bold > button > span.ml-1', { timeout: 60000 });
    const accountName = await page.$eval('#root > div > div > header > div._icon_iyfbn_38.ml-auto.flex.items-center.justify-center > div.ml-4.cursor-pointer.font-bold > button > span.ml-1', element => element.textContent.trim());
    assert.equal(accountName.toLowerCase(), 'admin', 'Login failed for admin');
    await page.waitForSelector('#root > div > div > div > aside > div > div._menu_t2mh1_44 > ul > li.ant-menu-submenu.ant-menu-submenu-inline.ant-menu-submenu-open > div', { timeout: 60000 });
    const memberManagementText = await page.$eval('#root > div > div > div > aside > div > div._menu_t2mh1_44 > ul > li.ant-menu-submenu.ant-menu-submenu-inline.ant-menu-submenu-open > div', element => element.textContent.trim());
    assert.equal(memberManagementText, '會員管理', 'Member management element text is incorrect');
    }, 20000); // 10秒超时
  
    // // 點擊登出按鈕
    // await page.click("#root > div > div > header > div._icon_iyfbn_38.ml-auto.flex.items-center.justify-center > span > i");
    // // 等待帳號輸入框再次可見
    // await page.waitForSelector('#account');
  });

