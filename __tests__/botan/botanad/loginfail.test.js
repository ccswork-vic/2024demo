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
  await page.type('#basic_password', 'aaaa12345566');
  await page.click("#basic > button");
  await page.waitForSelector('#basic > button', { timeout: 60000 });
});

afterAll(async () => {
  await browser.close();
});

describe('確認登入失敗', () => {
    test('檢查登入失敗彈窗', async () => {
      //nth-child(2) 就是抓取該區域第二個span元素，也能使用nth-of-type(2)
      //.ant-message.ant-message-top .ant-message-success > span:nth-child(2)
      //.ant-message-success > span:nth-child(2)
      //.ant-message-success > span:nth-of-type(2)
      //.ant-message-success > span[aria-label="check-circle"] + span  
      await page.waitForSelector('.ant-message-error > span:nth-child(2)', { timeout: 60000 }); 
      const failMessage = await page.$eval('.ant-message-error > span:nth-child(2)',element => element.textContent.trim()
    );
    expect(failMessage).toBe('ช่องบัญชีหรือรหัสผ่านหายหรือไม่ถูกต้อง');
    });
    test('檢查密碼可視化功能', async () => {
        await page.waitForSelector('#basic_password', { timeout: 60000 });
        let typeAttr = await page.$eval('#basic_password', el => el.getAttribute('type'));
        expect(typeAttr).toBe('password');
      
        // 點擊密碼眼睛按鈕
        await page.click('svg[data-icon="eye-invisible"]');
      
        // 再次檢查: `type` 應變為 "text"
        typeAttr = await page.$eval('#basic_password', el => el.getAttribute('type'));
        expect(typeAttr).toBe('text');
      
        // 確認 `value` 是否正確顯示密碼
        const valueAttr = await page.$eval('#basic_password', el => el.getAttribute('value'));
        expect(valueAttr).toBe('aaaa12345566');
    });
    test('檢查沒輸入帳號訊息', async () => {
        await new Promise(resolve => setTimeout(resolve, 3000));
        await page.click('#basic_account', { clickCount: 3 }); // 等於滑鼠連續點擊三次帳號欄位，會把原本輸入的帳號選起來
        await page.keyboard.press('Backspace'); // 刪除選中的內容
        
        await page.waitForSelector('#basic_account_help > div', { timeout: 60000 }); 
        const accounterrormsg = await page.$eval('#basic_account_help > div',element => element.textContent.trim()
      );
      expect(accounterrormsg).toBe('Please input your account!');
    });
    test('檢查沒輸入密碼訊息', async () => {
        await new Promise(resolve => setTimeout(resolve, 3000));
        await page.click('#basic_password', { clickCount: 3 }); // 等於滑鼠連續點擊三次帳號欄位，會把原本輸入的帳號選起來
        await page.keyboard.press('Backspace'); // 刪除選中的內容
        
        await page.waitForSelector('#basic_password_help > div', { timeout: 60000 }); 
        const accounterrormsg = await page.$eval('#basic_password_help > div',element => element.textContent.trim()
      );
      expect(accounterrormsg).toBe('Please input your password!');
    });
});

