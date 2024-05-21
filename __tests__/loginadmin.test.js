// login.test.js

const puppeteer = require('puppeteer');
const assert = require('assert');

describe('Login Test', () => {
  let browser;
  let page;

  beforeAll(async () => {
    jest.setTimeout(20000);
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

  test('Admin login should be successful', async () => {
    await page.type('#account', 'admin');
    await page.type('#password', 'aaaa1234');
    await page.click("#root > div > div > div > div > form > div > div:nth-child(4) > button");
    await page.waitForSelector('#root > div > div > header > div._icon_iyfbn_38.ml-auto.flex.items-center.justify-center > div.ml-4.cursor-pointer.font-bold > button > span.ml-1', { timeout: 60000 });
    const accountName = await page.$eval('#root > div > div > header > div._icon_iyfbn_38.ml-auto.flex.items-center.justify-center > div.ml-4.cursor-pointer.font-bold > button > span.ml-1', element => element.textContent.trim());
    assert.equal(accountName.toLowerCase(), 'admin', 'Login failed for admin');
    // 點擊登出按鈕
    await page.click("#root > div > div > header > div._icon_iyfbn_38.ml-auto.flex.items-center.justify-center > span > i");
    // 等待帳號輸入框再次可見
    await page.waitForSelector('#account');
  });

  test('Vicma login should fail', async () => {
    await page.reload(); // 重新加载页面以重置状态
    await page.type('#account', 'vicma');
    await page.type('#password', 'incorrect_password');
    await page.click("#root > div > div > div > div > form > div > div:nth-child(4) > button");
    await page.waitForSelector('div > div > div > div > span:nth-child(2)', { timeout: 60000 });
    const loginFailed = await page.$eval('div > div > div > div > span:nth-child(2)', element => element.textContent.trim());
    assert.equal(loginFailed, '密碼錯誤，請檢查密碼是否正確', 'Login should fail for vicma');
    // 等待帳號輸入框再次可見
    await page.waitForSelector('#account'); 
  });
  test('Vicag login should succeed', async () => {
    await page.reload(); // 重新加载页面以重置状态
    await page.type('#account', 'vicag');
    await page.type('#password', 'aaaa1234');
    await page.click("#root > div > div > div > div > form > div > div:nth-child(4) > button");
    await page.waitForSelector('#root > div > div > header > div._icon_iyfbn_38.ml-auto.flex.items-center.justify-center > div.ml-4.cursor-pointer.font-bold > button > span.ml-1', { timeout: 60000 });
    const accountName = await page.$eval('#root > div > div > header > div._icon_iyfbn_38.ml-auto.flex.items-center.justify-center > div.ml-4.cursor-pointer.font-bold > button > span.ml-1', element => element.textContent.trim());
    expect(accountName.toLowerCase()).toBe('vicag');
  });
});
