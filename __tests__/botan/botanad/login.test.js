const puppeteer = require('puppeteer');
const assert = require('assert');
const { environments, defaultAdminEnv } = require('../../utils/config');

let browser;
let page;
jest.setTimeout(60000);

const env = process.env.TEST_ENV || defaultAdminEnv;
const baseURL = environments[env];

beforeAll(async () => {

  browser = await puppeteer.launch({
    headless: false, // 设置为 true 则在无头模式下运行测试
    defaultViewport: null // 关闭默认视窗
  });
  page = await browser.newPage();
  await page.goto(`${baseURL}/report/financial-dashboard`, { waitUntil: "domcontentloaded" });
  await page.waitForSelector('#basic > button', { timeout: 60000 });

  // 登录
  await page.type('#basic_account', 'qaadmin');
  await page.type('#basic_password', 'aaaa1234');
  await page.click("#basic > button");
  await page.waitForSelector('#basic > button', { timeout: 60000 });
});

afterAll(async () => {
  await browser.close();
});
describe('確認登入成功', () => {
    test('檢查登入成功彈窗', async () => {
      //nth-child(2) 就是抓取該區域第二個span元素，也能使用nth-of-type(2)
      //.ant-message.ant-message-top .ant-message-success > span:nth-child(2)
      //.ant-message-success > span:nth-child(2)
      //.ant-message-success > span:nth-of-type(2)
      //.ant-message-success > span[aria-label="check-circle"] + span  
      await page.waitForSelector('.ant-message.ant-message-top .ant-message-success > span:nth-child(2)', { timeout: 60000 }); 
      const successMessage = await page.$eval('.ant-message.ant-message-top .ant-message-success > span:nth-child(2)',
        element => element.textContent.trim()
    );
    expect(successMessage).toBe('เข้าสู่ระบบสำเร็จ');
    });
    test('檢查左上角出現logo', async () => {
        const logoImage = await page.$('img[src="/assets/logo-BwNRnXYm.png"]');
        expect(logoImage).toBeTruthy(); // 確認圖片存在
  });
  test('檢查右上角出現登入使用者名稱', async () => {
    //const adminText = await page.$eval('.flex.items-center.gap-4', el => el.textContent.split('QA')[1].trim());
    //expect(adminText).toBe('qaadmin');
    const aaa = await page.$eval('.flex.items-center.gap-4', el => el.textContent.trim());
    const adminText = aaa.slice(7);
    expect(adminText).toBe('qaadmin');
    });
  test('檢查右上角出現系統時區', async () => {
        const timezoneText = await page.$eval('.flex.items-center.gap-4 small', el => el.textContent.trim());
        expect(timezoneText).toBe('UTC+7');
        });
test('檢查footer版號與version相同', async () => {
    const versiontext = await page.$eval('.ant-layout-footer.text-center', el => el.textContent.trim());
    //const version = versiontext.split('v')[1]; // 去掉開頭的 "v"
    const version = versiontext.slice(1);
    expect(version).toBe(process.env.BACKEND_PROJECT_VERSION);
});
});