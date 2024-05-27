// 指定跑哪一個檔案 npx jest __tests__/xxxxxx.test.js
//加上看log 語法npx jest --silent=false __tests__/ag/ag-checksubmenu.test.js
//在 macOS 上，默认快捷键是 Option + Shift + F。
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
  await page.goto('https://test-agent.zestplay.co/login', { waitUntil: "domcontentloaded" });
  await page.waitForSelector('#root > div > div > div > div > form > div > div:nth-child(4) > button', { timeout: 60000 });

  // 登录
  await page.type('#account', 'vicag');
  await page.type('#password', 'aaaa1234');
  await page.click("#root > div > div > div > div > form > div > div:nth-child(4) > button");
  await page.waitForSelector('#root > div > div > header > div._icon_iyfbn_38.ml-auto.flex.items-center.justify-center > div.ml-4.cursor-pointer.font-bold > button > span.ml-1', { timeout: 60000 });
});
afterAll(async () => {
  await browser.close();
});

describe('點語系切換', () => {
    test('點語系切換', async () => {

            const elementHandle = await page.$('#root > div > div > header > div._icon_iyfbn_38.ml-auto.flex.items-center.justify-center > i');
            await elementHandle.hover();

            // 等待一段时间以确保弹出窗口完全显示
            await new Promise(resolve => setTimeout(resolve, 4000)); // 等待1秒鐘，確保子菜單展開
                 
});
});

describe.skip('點語系', () => {
    test('點擊語系切換', async () => {
      const xpathForchangelanguage = '//*[@data-trigger-id="dropdown-language-i"]';

      // 等待元素出现
      await page.waitForFunction((xpath) => {
          const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
          return result.singleNodeValue !== null;
      }, { timeout: 60000 }, xpathForchangelanguage);

      // 点击元素
      await page.evaluate((xpath) => {
          const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
          const element = result.singleNodeValue;
          if (element) {
              element.click();
          } else {
              throw new Error(`Element with XPath ${xpath} not found.`);
          }
      }, xpathForchangelanguage);


        //await page.waitForSelector('//*[@id="root"]/div/div/div/aside/div/div[2]/ul/li[4]/div', { timeout: 60000 });
        //await page.click('//*[@id="root"]/div/div/div/aside/div/div[2]/ul/li[4]/div'); // 點統計報表
        // 等待子菜单展開
        await new Promise(resolve => setTimeout(resolve, 1000)); // 等待1秒鐘，確保子菜單展開

        describe('點語系切換', () => {
    test('點語系切換', async () => {

            const elementHandle = await page.$('#root > div > div > header > div._icon_iyfbn_38.ml-auto.flex.items-center.justify-center > i');
            await elementHandle.hover();

            // 等待一段时间以确保弹出窗口完全显示
            await new Promise(resolve => setTimeout(resolve, 4000)); // 等待1秒鐘，確保子菜單展開
                 
});


describe.skip('點登出', () => {
    test('點擊登出', async () => {
      const xpathForsearch = '//*[@data-trigger-id="logout-i"]';

      // 等待元素出现
      await page.waitForFunction((xpath) => {
          const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
          return result.singleNodeValue !== null;
      }, { timeout: 60000 }, xpathForsearch);

      // 点击元素
      await page.evaluate((xpath) => {
          const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
          const element = result.singleNodeValue;
          if (element) {
              element.click();
          } else {
              throw new Error(`Element with XPath ${xpath} not found.`);
          }
      }, xpathForsearch);


        //await page.waitForSelector('//*[@id="root"]/div/div/div/aside/div/div[2]/ul/li[4]/div', { timeout: 60000 });
        //await page.click('//*[@id="root"]/div/div/div/aside/div/div[2]/ul/li[4]/div'); // 點統計報表
        // 等待子菜单展開
        await new Promise(resolve => setTimeout(resolve, 1000)); // 等待1秒鐘，確保子菜單展開
});

});
});
});
});