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
  await page.goto('https://dev.botan888.co/casino/home?modal=auth&tab=login', { waitUntil: "domcontentloaded" });
  await page.waitForSelector('#validateOnly_account', { timeout: 60000 });

  // 登录
  await page.type('#validateOnly_account', '0999111112');
  await page.type('#validateOnly_password', 'aaaa12345');
  await page.click("#validateOnly > div.ant-form-item.mb-0.css-1dwc1ye > div > div > div > div > button");
  await page.waitForSelector('#validateOnly > div.ant-form-item.mb-0.css-1dwc1ye > div > div > div > div > button', { timeout: 60000 });
});

afterAll(async () => {
  await browser.close();
});

describe('輸入錯誤密碼確認登入失敗', () => {
  test('檢查登入失敗提示', async () => {
    await page.waitForSelector('div > div > div > div > div.ant-notification-notice-description', { timeout: 60000 });
    const WelcomeText = await page.$eval('div > div > div > div > div.ant-notification-notice-description', element => element.textContent.trim());
    assert.equal(WelcomeText, 'account or password error (11020002)', 'Admin setting element text is incorrect');
  });
});

describe('確認登入彈窗停留在頁面上', () => {
    test('檢查登入彈窗存在', async () => {
      await page.waitForSelector('body > div:nth-child(2) > div > div.ant-modal-wrap.ant-modal-centered > div > div:nth-child(2) > div');
      const popup = await page.$('body > div:nth-child(2) > div > div.ant-modal-wrap.ant-modal-centered > div > div:nth-child(2) > div');
      expect(popup).toBeTruthy(); // 检查按钮是否存在
    });
    test('檢查登入彈窗的標題', async () => {
      const ForgotpwdText = await page.$eval('body > div:nth-child(2) > div > div.ant-modal-wrap.ant-modal-centered > div > div:nth-child(2) > div > div.ant-modal-header', element => element.textContent.trim());
      assert.equal(ForgotpwdText, 'เข้าสู่ระบบ', 'text is incorrect');
    });
    test('檢查登入彈窗的登入按鈕', async () => {
      await page.waitForSelector('#validateOnly > div.ant-form-item.mb-0.css-1dwc1ye > div > div > div > div > button');
      const loginbtn = await page.$('#validateOnly > div.ant-form-item.mb-0.css-1dwc1ye > div > div > div > div > button');
      expect(loginbtn).toBeTruthy(); // 检查按钮是否存在
    });
    test('檢查登入彈窗的忘記密碼文字', async () => {
      const ForgotpwdText = await page.$eval('#validateOnly > div.mb-3.text-end.text-sm > span', element => element.textContent.trim());
      assert.equal(ForgotpwdText, 'ลืมรหัสผ่าน ?', 'text is incorrect');
    });
    test('檢查登入彈窗的還沒有帳戶文字', async () => {
      const ForgotpwdText = await page.$eval('#rc-tabs-0-panel-login > div > span.cursor-pointer.ml-1._remind-text_ahu8e_35', element => element.textContent.trim());
      assert.equal(ForgotpwdText, 'ยังไม่มีบัญชี?', 'text is incorrect');
    });
  });
  
  describe('輸入錯誤密碼確認登入失敗', () => {
  test('檢查登入失敗提示', async () => {
    await page.waitForSelector('div > div > div > div > div.ant-notification-notice-description', { timeout: 60000 });
    const WelcomeText = await page.$eval('div > div > div > div > div.ant-notification-notice-description', element => element.textContent.trim());
    assert.equal(WelcomeText, 'account or password error (11020002)', 'Admin setting element text is incorrect');
  });
});

describe('確認登入彈窗停留在頁面上', () => {
    test('檢查登入彈窗存在', async () => {
      await page.waitForSelector('body > div:nth-child(2) > div > div.ant-modal-wrap.ant-modal-centered > div > div:nth-child(2) > div');
      const popup = await page.$('body > div:nth-child(2) > div > div.ant-modal-wrap.ant-modal-centered > div > div:nth-child(2) > div');
      expect(popup).toBeTruthy(); // 检查按钮是否存在
    });
    test('檢查登入彈窗的標題', async () => {
      const ForgotpwdText = await page.$eval('body > div:nth-child(2) > div > div.ant-modal-wrap.ant-modal-centered > div > div:nth-child(2) > div > div.ant-modal-header', element => element.textContent.trim());
      assert.equal(ForgotpwdText, 'เข้าสู่ระบบ', 'text is incorrect');
    });
    test('檢查登入彈窗的登入按鈕', async () => {
      await page.waitForSelector('#validateOnly > div.ant-form-item.mb-0.css-1dwc1ye > div > div > div > div > button');
      const loginbtn = await page.$('#validateOnly > div.ant-form-item.mb-0.css-1dwc1ye > div > div > div > div > button');
      expect(loginbtn).toBeTruthy(); // 检查按钮是否存在
    });
    test('檢查登入彈窗的忘記密碼文字', async () => {
      const ForgotpwdText = await page.$eval('#validateOnly > div.mb-3.text-end.text-sm > span', element => element.textContent.trim());
      assert.equal(ForgotpwdText, 'ลืมรหัสผ่าน ?', 'text is incorrect');
    });
    test('檢查登入彈窗的還沒有帳戶文字', async () => {
      const ForgotpwdText = await page.$eval('#rc-tabs-0-panel-login > div > span.cursor-pointer.ml-1._remind-text_ahu8e_35', element => element.textContent.trim());
      assert.equal(ForgotpwdText, 'ยังไม่มีบัญชี?', 'text is incorrect');
    });
  });

describe('更改輸入帳號，再次嘗試登入失敗', () => {
    test('檢查登入失敗提示', async () => {
      await page.click('#validateOnly_account', { clickCount: 3 }); // 等於滑鼠連續點擊三次帳號欄位，會把原本輸數的帳號選起來
      await page.keyboard.press('Backspace'); // 刪除選中的內容
      await page.type('#validateOnly_account', '099911111999999');
      await page.type('#validateOnly_password', 'aaaa12345');
      await page.click("#validateOnly > div.ant-form-item.mb-0.css-1dwc1ye > div > div > div > div > button");
      await page.waitForSelector('div > div > div > div > div.ant-notification-notice-description', { timeout: 60000 });
      const WelcomeText = await page.$eval('div > div > div > div > div.ant-notification-notice-description', element => element.textContent.trim());
      assert.equal(WelcomeText, 'account or password error (11020002)', 'Admin setting element text is incorrect');

       // 等待彈窗並加上時間讓他完全顯示
       await new Promise(resolve => setTimeout(resolve, 4000)); 
    });
  });