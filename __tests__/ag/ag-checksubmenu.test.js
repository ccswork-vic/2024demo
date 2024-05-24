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
describe('會員管理測試', () => {
    test('確認新增會員、會員清單、新增子帳號和子帳號清單是否存在', async () => {
      await page.waitForSelector('#root > div > div > div > aside > div > div._menu_t2mh1_44 > ul > li:nth-child(1) > div', { timeout: 60000 });
      await page.click('#root > div > div > div > aside > div > div._menu_t2mh1_44 > ul > li:nth-child(1) > div'); // 點會員管理
      
      // 等待子菜单展開
      await new Promise(resolve => setTimeout(resolve, 1000)); // 等待1秒鐘，確保子菜單展開
      
      // 檢查會員清單是否存在
      const memberListExists = await page.evaluate(() => {
        const links = document.querySelectorAll('a');
        let memberListFound = false;
        links.forEach(link => {
          if (link.textContent.trim() === '會員清單') {
            memberListFound = true;
          }
        });
        return memberListFound;
      });
  
      // 斷言會員清單存在
      expect(memberListExists).toBeTruthy();
    });
  });
// describe('會員管理測試', () => {
//     test('確認新增會員、會員清單、新增子帳號和子帳號清單是否存在', async () => {
//       await page.waitForSelector('#root > div > div > div > aside > div > div._menu_t2mh1_44 > ul > li:nth-child(1) > div', { timeout: 60000 });
//       await page.click('#root > div > div > div > aside > div > div._menu_t2mh1_44 > ul > li:nth-child(1) > div'); // 點會員管理
      
//       // 等待子菜單展開
//       await new Promise(resolve => setTimeout(resolve, 1000)); // 等待1秒鐘，確保子菜單展開
      
//       // 檢查每個項目是否存在
//       const menuItems = ['新增會員', '會員清單', '新增子帳號', 'aaaaa子帳號清單'];
//       const menuItemExists = await page.evaluate((menuItems) => {
//         const links = document.querySelectorAll('a');
//         const menuItemExists = {};
//         menuItems.forEach(item => {
//           menuItemExists[item] = false;
//         });
//         links.forEach(link => {
//           const linkText = link.textContent.trim();
//           if (menuItems.includes(linkText)) {
//             menuItemExists[linkText] = true;
//           }
//         });
//         return menuItemExists;
//       }, menuItems);
  
//       // 斷言每個項目存在
//       Object.entries(menuItemExists).forEach(([item, exists]) => {
//         expect(exists).toBeTruthy();
//       });
//     });
//   });
  