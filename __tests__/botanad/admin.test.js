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
  await page.goto('https://dev-admin.botan888.co/report/financial-dashboard', { waitUntil: "domcontentloaded" });
  await page.waitForSelector('#basic > button', { timeout: 60000 });

  // 登录
  await page.type('#basic_account', 'admin03');
  await page.type('#basic_password', 'aaaa1234');
  await page.click("#basic > button");
  await page.waitForSelector('#basic > button', { timeout: 60000 });
});

afterAll(async () => {
  await browser.close();
});

describe('檢查左側目錄', () => {
  test('檢查admin 左邊選單存在報表', async () => {
    await page.waitForSelector('#root > div > div > aside > div > ul > li:nth-child(1) > div > span', { timeout: 60000 });
    const reoportsText = await page.$eval('#root > div > div > aside > div > ul > li:nth-child(1) > div > span', element => element.textContent.trim());
    assert.equal(reoportsText, 'รายงาน', 'Admin setting element text is incorrect');
  });
  test('檢查admin 左邊選單存在活動管理', async () => {
    const missionPromotionsText = await page.$eval('#root > div > div > aside > div > ul > li.ant-menu-item > span', element => element.textContent.trim());
    assert.equal(missionPromotionsText, 'รายการโปรโมชัน', 'Member management element text is incorrect');
  });
  test('檢查admin 左邊選單存在用戶', async () => {
    const menbersText = await page.$eval('#root > div > div > aside > div > ul > li:nth-child(3) > div > span', element => element.textContent.trim());
    assert.equal(menbersText, 'ผู้ใช้', 'online player element text is incorrect');
  });
  test('檢查admin 左邊選單存在金融中心', async () => {
    const financialCenterText = await page.$eval('#root > div > div > aside > div > ul > li:nth-child(4) > div > span', element => element.textContent.trim());
    assert.equal(financialCenterText, 'ศูนย์การเงิน', 'report Text element text is incorrect');
  });
});





describe('檢查上方目錄', () => {
  test.skip('檢查admin上方目錄登入名稱', async () => {
    await page.waitForSelector('#root > div > div > header > div._icon_iyfbn_38.ml-auto.flex.items-center.justify-center > div.ml-4.cursor-pointer.font-bold > button > span.ml-1', { timeout: 60000 });
    const adminSettingText = await page.$eval('#root > div > div > header > div._icon_iyfbn_38.ml-auto.flex.items-center.justify-center > div.ml-4.cursor-pointer.font-bold > button > span.ml-1', element => element.textContent.trim());
    assert.equal(adminSettingText, 'ADMIN', 'Admin setting element text is incorrect');

  });
  test.skip('檢查admin上方目錄金額區塊', async () => {
    await page.waitForSelector('#root > div > div > header > div._icon_iyfbn_38.ml-auto.flex.items-center.justify-center > div:nth-child(2) > button');
    const button = await page.$('#root > div > div > header > div._icon_iyfbn_38.ml-auto.flex.items-center.justify-center > div:nth-child(2) > button');
    expect(button).toBeTruthy(); // 检查按钮是否存在
    //expect(button).toBeFalsy(); // 检查按钮不存在
  });
  test.skip('檢查admin上方目錄切換語系按鈕', async () => {
    await page.waitForSelector('#root > div > div > header > div._icon_iyfbn_38.ml-auto.flex.items-center.justify-center > i');
    const button = await page.$('#root > div > div > header > div._icon_iyfbn_38.ml-auto.flex.items-center.justify-center > i');
    expect(button).toBeTruthy(); // 检查按钮是否存在
  });
  test.skip('檢查admin上方目錄登出按鈕', async () => {
    await page.waitForSelector('#root > div > div > header > div._icon_iyfbn_38.ml-auto.flex.items-center.justify-center > span > i');
    const button = await page.$('#root > div > div > header > div._icon_iyfbn_38.ml-auto.flex.items-center.justify-center > span > i');
    expect(button).toBeTruthy(); // 检查按钮是否存在
  });
});
describe('檢查畫面中間區塊', () => {
  test.skip('檢查admin中間區塊-壓碼量', async () => {
    await page.waitForSelector('#root > div > div > div > div > main > div.ant-row.ant-row-center.css-1r287do > div:nth-child(1) > div > div > div > h2.text-xl.mt-0', { timeout: 60000 });
    const TurnoverTodayText = await page.$eval('#root > div > div > div > div > main > div.ant-row.ant-row-center.css-1r287do > div:nth-child(1) > div > div > div > h2.text-xl.mt-0', element => element.textContent.trim());
    assert.equal(TurnoverTodayText, '壓碼量', 'TurnoverToday Text is incorrect');
  });
  test.skip('檢查admin中間區塊-玩家淨輸贏', async () => {
    const PlayerNetwinTodayText = await page.$eval('#root > div > div > div > div > main > div.ant-row.ant-row-center.css-1r287do > div:nth-child(2) > div > div > div > h2.text-xl.mt-0', element => element.textContent.trim());
    assert.equal(PlayerNetwinTodayText, '玩家淨輸贏', 'PlayerNetwinToday Text is incorrect');
  });
  test.skip('檢查admin中間區塊-同時在線人數', async () => {
    const ConcurrentusersText = await page.$eval('#root > div > div > div > div > main > div.ant-row.ant-row-center.css-1r287do > div:nth-child(3) > div > div > div > h2.text-xl.mt-0', element => element.textContent.trim());
    assert.equal(ConcurrentusersText, '同時在線人數', 'Concurrentusers Text is incorrect');
  });
  test.skip('檢查admin中間區塊-每小時累計壓碼量', async () => {
    const TurnoverHourText = await page.$eval('#root > div > div > div > div > main > div.mt-6 > div.mb-6 > div > div > div > div > div > h2', element => element.textContent.trim());
    assert.equal(TurnoverHourText, '每小時累計壓碼量', 'TurnoverHour Text is incorrect');
  });
  test.skip('檢查admin中間區塊-每小時玩家輸贏狀況', async () => {
    const PlayerNetwinHourText = await page.$eval('#root > div > div > div > div > main > div.mt-6 > div:nth-child(2) > div > div > div > div > h2', element => element.textContent.trim());
    assert.equal(PlayerNetwinHourText, '每小時玩家輸贏狀況', 'PlayerNetwinHour Text is incorrect');
  });
});

