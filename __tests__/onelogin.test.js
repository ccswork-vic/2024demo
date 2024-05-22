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
  await page.type('#account', 'admin');
  await page.type('#password', 'aaaa1234');
  await page.click("#root > div > div > div > div > form > div > div:nth-child(4) > button");
  await page.waitForSelector('#root > div > div > header > div._icon_iyfbn_38.ml-auto.flex.items-center.justify-center > div.ml-4.cursor-pointer.font-bold > button > span.ml-1', { timeout: 60000 });
});

afterAll(async () => {
  await browser.close();
});

describe('檢查左側目錄', () => {
  test('檢查admin 左邊選單存在管理員設定', async () => {
    await page.waitForSelector('#root > div > div > div > aside > div > div._menu_t2mh1_44 > ul > li:nth-child(1) > div', { timeout: 60000 });
    const adminSettingText = await page.$eval('#root > div > div > div > aside > div > div._menu_t2mh1_44 > ul > li:nth-child(1) > div', element => element.textContent.trim());
    assert.equal(adminSettingText, '管理員設定', 'Admin setting element text is incorrect');
  });
  test('檢查admin 左邊選單存在會員管理', async () => {
    const memberManagementText = await page.$eval('#root > div > div > div > aside > div > div._menu_t2mh1_44 > ul > li:nth-child(2) > div > span', element => element.textContent.trim());
    assert.equal(memberManagementText, '會員管理', 'Member management element text is incorrect');
  });
  test('檢查admin 左邊選單存在在線玩家', async () => {
    const onlineplayerText = await page.$eval('#root > div > div > div > aside > div > div._menu_t2mh1_44 > ul > li.ant-menu-item > span > a', element => element.textContent.trim());
    assert.equal(onlineplayerText, '在線玩家', 'online player element text is incorrect');
  });
  test('檢查admin 左邊選單存在統計報表', async () => {
    const reportText = await page.$eval('#root > div > div > div > aside > div > div._menu_t2mh1_44 > ul > li:nth-child(4) > div > span', element => element.textContent.trim());
    assert.equal(reportText, '統計報表', 'report Textelement text is incorrect');
  });
});
describe('檢查上方目錄', () => {
  test('檢查admin上方目錄登入名稱', async () => {
      await page.waitForSelector('#root > div > div > div > aside > div > div._menu_t2mh1_44 > ul > li:nth-child(1) > div', { timeout: 60000 });
      const adminSettingText = await page.$eval('#root > div > div > div > aside > div > div._menu_t2mh1_44 > ul > li:nth-child(1) > div', element => element.textContent.trim());
      assert.equal(adminSettingText, '管理員設定', 'Admin setting element text is incorrect');
  });
  test('檢查admin上方目錄金額', async () => {
      const memberManagementText = await page.$eval('#root > div > div > div > aside > div > div._menu_t2mh1_44 > ul > li:nth-child(2) > div > span', element => element.textContent.trim());
      assert.equal(memberManagementText, '會員管理', 'Member management element text is incorrect');
  });
  test('檢查admin上方目錄切換語系', async () => {
      const onlineplayerText = await page.$eval('#root > div > div > div > aside > div > div._menu_t2mh1_44 > ul > li.ant-menu-item > span > a', element => element.textContent.trim());
      assert.equal(onlineplayerText, '在線玩家', 'online player element text is incorrect');
  });
  test('檢查admin上方目錄登出按鈕', async () => {
      const reportText = await page.$eval('#root > div > div > div > aside > div > div._menu_t2mh1_44 > ul > li:nth-child(4) > div > span', element => element.textContent.trim());
      assert.equal(reportText, '統計報表', 'report Textelement text is incorrect');
  });
});
describe('檢查畫面中間區塊', () => {
  test('檢查admin中間區塊-壓碼量', async () => {
      await page.waitForSelector('#root > div > div > div > aside > div > div._menu_t2mh1_44 > ul > li:nth-child(1) > div', { timeout: 60000 });
      const adminSettingText = await page.$eval('#root > div > div > div > aside > div > div._menu_t2mh1_44 > ul > li:nth-child(1) > div', element => element.textContent.trim());
      assert.equal(adminSettingText, '管理員設定', 'Admin setting element text is incorrect');
  });
  test('檢查admin中間區塊-玩家淨輸贏', async () => {
      const memberManagementText = await page.$eval('#root > div > div > div > aside > div > div._menu_t2mh1_44 > ul > li:nth-child(2) > div > span', element => element.textContent.trim());
      assert.equal(memberManagementText, '會員管理', 'Member management element text is incorrect');
  });
  test('檢查admin中間區塊-同時在線人數', async () => {
      const onlineplayerText = await page.$eval('#root > div > div > div > aside > div > div._menu_t2mh1_44 > ul > li.ant-menu-item > span > a', element => element.textContent.trim());
      assert.equal(onlineplayerText, '在線玩家', 'online player element text is incorrect');
  });
  test('檢查admin中間區塊-每小時累計壓碼量', async () => {
      const reportText = await page.$eval('#root > div > div > div > aside > div > div._menu_t2mh1_44 > ul > li:nth-child(4) > div > span', element => element.textContent.trim());
      assert.equal(reportText, '統計報表', 'report Textelement text is incorrect');
  });
  test('檢查admin中間區塊-每小時玩家輸贏狀況', async () => {
    const reportText = await page.$eval('#root > div > div > div > aside > div > div._menu_t2mh1_44 > ul > li:nth-child(4) > div > span', element => element.textContent.trim());
    assert.equal(reportText, '統計報表', 'report Textelement text is incorrect');
});
});

