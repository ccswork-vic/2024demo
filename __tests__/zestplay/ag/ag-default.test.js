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
});

afterAll(async () => {
  await browser.close();
});

describe('檢查左側目錄', () => {
  test('檢查ag 左邊選單存在會員管理', async () => {
    const memberManagementText = await page.$eval('#root > div > div > div > aside > div > div._menu_t2mh1_44 > ul > li:nth-child(1) > div > span', element => element.textContent.trim());
    expect(memberManagementText).toBeTruthy(); //toBeTruthy toBeFalsy
    assert.equal(memberManagementText, '會員管理', 'Member management element text is incorrect');
  });
  test('檢查ag 左邊選單存在在線玩家', async () => {
    const onlineplayerText = await page.$eval('#root > div > div > div > aside > div > div._menu_t2mh1_44 > ul > li.ant-menu-item > span > a', element => element.textContent.trim());
    expect(onlineplayerText).toBeTruthy(); 
    assert.equal(onlineplayerText, '在線玩家', 'online player element text is incorrect');
  });
  test('檢查ag 左邊選單存在統計報表', async () => {
    const reportText = await page.$eval('#root > div > div > div > aside > div > div._menu_t2mh1_44 > ul > li:nth-child(3) > div', element => element.textContent.trim());
    expect(reportText).toBeTruthy();
    assert.equal(reportText, '統計報表', 'report Text element text is incorrect');
  });
  test('檢查ag 左邊選單存在快速搜尋', async () => {
    const searchText = await page.$eval('#root > div > div > div > aside > div > div._menu_t2mh1_44 > ul > li:nth-child(4) > div', element => element.textContent.trim());
    expect(searchText).toBeTruthy();
    assert.equal(searchText, '快速搜尋', 'search Text element text is incorrect');
  });
  test('檢查ag 左邊選單存在帳目查詢', async () => {
    const StatementText = await page.$eval('#root > div > div > div > aside > div > div._menu_t2mh1_44 > ul > li:nth-child(5) > div > span', element => element.textContent.trim());
    expect(StatementText).toBeTruthy();
    assert.equal(StatementText, '帳目查詢22222', 'Statement Text element text is incorrect');
  });
});
describe('檢查上方目錄', () => {
  test('檢查ag方目錄登入名稱', async () => {
    await page.waitForSelector('#root > div > div > header > div._icon_iyfbn_38.ml-auto.flex.items-center.justify-center > div.ml-4.cursor-pointer.font-bold > button > span.ml-1', { timeout: 60000 });
    const loginnameText = await page.$eval('#root > div > div > header > div._icon_iyfbn_38.ml-auto.flex.items-center.justify-center > div.ml-4.cursor-pointer.font-bold > button > span.ml-1', element => element.textContent.trim());
    expect(loginnameText).toBeTruthy();
    assert.equal(loginnameText, 'VICAG', 'loginname Text is incorrect');

  });
  test('檢查ag上方目錄金額區塊', async () => {
    await page.waitForSelector('#root > div > div > header > div._icon_iyfbn_38.ml-auto.flex.items-center.justify-center > div:nth-child(2) > button');
    const button = await page.$('#root > div > div > header > div._icon_iyfbn_38.ml-auto.flex.items-center.justify-center > div:nth-child(2) > button');
    expect(button).toBeTruthy(); // 检查按钮是否存在
    //expect(button).toBeFalsy(); // 检查按钮不存在
  });
  test('檢查ag上方目錄切換語系按鈕', async () => {
    await page.waitForSelector('#root > div > div > header > div._icon_iyfbn_38.ml-auto.flex.items-center.justify-center > i');
    const button = await page.$('#root > div > div > header > div._icon_iyfbn_38.ml-auto.flex.items-center.justify-center > i');
    expect(button).toBeTruthy(); // 检查按钮是否存在
  });
  test('檢查ag上方目錄登出按鈕', async () => {
    await page.waitForSelector('#root > div > div > header > div._icon_iyfbn_38.ml-auto.flex.items-center.justify-center > span > i');
    const button = await page.$('#root > div > div > header > div._icon_iyfbn_38.ml-auto.flex.items-center.justify-center > span > i');
    expect(button).toBeTruthy(); // 检查按钮是否存在
  });
});
describe('檢查畫面中間區塊', () => {
  test('檢查ag中間區塊-壓碼量', async () => {
    await page.waitForSelector('#root > div > div > div > div > main > div.ant-row.ant-row-center.css-1r287do > div:nth-child(1) > div > div > div > h2.text-xl.mt-0', { timeout: 60000 });
    const TurnoverTodayText = await page.$eval('#root > div > div > div > div > main > div.ant-row.ant-row-center.css-1r287do > div:nth-child(1) > div > div > div > h2.text-xl.mt-0', element => element.textContent.trim());
    expect(TurnoverTodayText).toBeTruthy();
    assert.equal(TurnoverTodayText, '壓碼量', 'TurnoverToday Text is incorrect');
  });
  test('檢查ag中間區塊-玩家淨輸贏', async () => {
    const PlayerNetwinTodayText = await page.$eval('#root > div > div > div > div > main > div.ant-row.ant-row-center.css-1r287do > div:nth-child(2) > div > div > div > h2.text-xl.mt-0', element => element.textContent.trim());
    expect(PlayerNetwinTodayText).toBeTruthy();
    assert.equal(PlayerNetwinTodayText, '玩家淨輸贏', 'PlayerNetwinToday Text is incorrect');
  });
  test('檢查ag中間區塊-同時在線人數', async () => {
    const ConcurrentusersText = await page.$eval('#root > div > div > div > div > main > div.ant-row.ant-row-center.css-1r287do > div:nth-child(3) > div > div > div > h2.text-xl.mt-0', element => element.textContent.trim());
    expect(ConcurrentusersText).toBeTruthy();
    assert.equal(ConcurrentusersText, '同時在線人數', 'Concurrentusers Text is incorrect');
  });
  test('檢查ag中間區塊-每小時累計壓碼量', async () => {
    const TurnoverHourText = await page.$eval('#root > div > div > div > div > main > div.mt-6 > div.mb-6 > div > div > div > div > div > h2', element => element.textContent.trim());
    expect(TurnoverHourText).toBeTruthy();
    assert.equal(TurnoverHourText, '每小時累計壓碼量', 'TurnoverHour Text is incorrect');
  });
  test('檢查ag中間區塊-每小時玩家輸贏狀況', async () => {
    const PlayerNetwinHourText = await page.$eval('#root > div > div > div > div > main > div.mt-6 > div:nth-child(2) > div > div > div > div > h2', element => element.textContent.trim());
    expect(PlayerNetwinHourText).toBeTruthy();
    assert.equal(PlayerNetwinHourText, '每小時玩家輸贏狀況', 'PlayerNetwinHour Text is incorrect');
  });
});

