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
  page = await browser.pages().then(pages => pages[0]);
  //page = await browser.newPage();
  await page.goto('https://test-agent.zestplay.co/login', { waitUntil: "domcontentloaded" });
  await page.waitForSelector('#root > div > div > div > div > form > div > div:nth-child(4) > button', { timeout: 60000 });

  // 登录
  await page.type('#account', 'vicag');
  await page.type('#password', 'aaaa1234');
  await page.click("#root > div > div > div > div > form > div > div:nth-child(4) > button");
  await page.waitForSelector('#root > div > div > header > div._icon_iyfbn_38.ml-auto.flex.items-center.justify-center > div.ml-4.cursor-pointer.font-bold > button > span.ml-1', { timeout: 60000 });
//   await page.waitForSelector('#root > div > div > div > aside > div > div._menu_t2mh1_44 > ul > li:nth-child(1) > div > span', { timeout: 60000 });
//   await page.click("#root > div > div > div > aside > div > div._menu_t2mh1_44 > ul > li:nth-child(1) > div > span");//點會員管理
//   await page.waitForSelector('#rc-menu-uuid-77328-1-member-popup > li.ant-menu-item.ant-menu-item-selected > span > a', { timeout: 60000 });
//   await page.click("#rc-menu-uuid-77328-1-member-popup > li.ant-menu-item.ant-menu-item-selected > i");//點新增會員
});
afterAll(async () => {
  await browser.close();
});

  describe('會員管理測試', () => {
    test('點擊會員管理並選擇新增會員', async () => {
      await page.waitForSelector('#root > div > div > div > aside > div > div._menu_t2mh1_44 > ul > li:nth-child(1) > div', { timeout: 60000 });
      await page.click('#root > div > div > div > aside > div > div._menu_t2mh1_44 > ul > li:nth-child(1) > div'); // 點會員管理
  
      // 等待子菜单展开
      await new Promise(resolve => setTimeout(resolve, 1000)); // 等待1秒钟，确保子菜单展开
  
      // 點擊新增會員
      await page.evaluate(() => {
        const links = document.querySelectorAll('a');
        links.forEach(link => {
          if (link.textContent.trim() === '新增會員') {
            link.click();
          }
        });
      });
  
      await page.waitForSelector('#root > div > div > div > div > main > form > div:nth-child(1) > div > h2', { timeout: 60000 });
      const account = await page.$eval('#root > div > div > div > div > main > form > div:nth-child(1) > div > h2', element => element.textContent.trim());
      assert.equal(account, '新增會員', 'account Text is incorrect');

      await new Promise(resolve => setTimeout(resolve, 5000));
    });
    
  });

