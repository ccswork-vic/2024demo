// 指定跑哪一個檔案 npx jest __tests__/xxxxxx.test.js
const puppeteer = require('puppeteer');
const assert = require('assert');
const {  socialMedia,} = require('../../utils/botanSources');

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
  await page.type('#validateOnly_account', '0999111116');
  await page.type('#validateOnly_password', 'aaaa1234');
  await page.click("#validateOnly > div.ant-form-item.mb-0 > div > div > div > div > button");
  await page.waitForSelector('#validateOnly > div.ant-form-item.mb-0 > div > div > div > div > button', { timeout: 60000 });
});

afterAll(async () => {
  await browser.close();
});

describe('檢查wallet', () => {
  test('檢查左側清單存在balance', async () => {
    await page.goto('https://dev.botan888.co/wallet/balance', { waitUntil: "domcontentloaded" });
    const xpath = "//*[text()='ยอดคงเหลือ']";
    await new Promise(resolve => setTimeout(resolve, 1000));
    await page.evaluate((xpath) => {
        const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (!element) {
          throw new Error(`Element with XPath ${xpath} not found.`);
        }
    }, xpath);
    expect(xpath).toBeTruthy(); // 检查按钮是否存在
  });
  test('檢查左側清單存在帳戶管理', async () => {
    //await page.goto('https://dev.botan888.co/wallet/balance', { waitUntil: "domcontentloaded" });
    const xpath = "//*[text()='การจัดการบัญชี']";
    await new Promise(resolve => setTimeout(resolve, 1000));
    await page.evaluate((xpath) => {
        const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (!element) {
          throw new Error(`Element with XPath ${xpath} not found.`);
        }
    }, xpath);
    expect(xpath).toBeTruthy(); // 检查按钮是否存在
  });
  test('檢查左側清單存在存錢', async () => {
    //await page.goto('https://dev.botan888.co/wallet/balance', { waitUntil: "domcontentloaded" });
    const xpath = "//*[text()='ฝากเงิน']";
    await new Promise(resolve => setTimeout(resolve, 1000));
    await page.evaluate((xpath) => {
        const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (!element) {
          throw new Error(`Element with XPath ${xpath} not found.`);
        }
    }, xpath);
    expect(xpath).toBeTruthy(); // 检查按钮是否存在
  });
  test('檢查左側清單存在提款', async () => {
    //await page.goto('https://dev.botan888.co/wallet/balance', { waitUntil: "domcontentloaded" });
    const xpath = "//*[text()='ถอนเงิน']";
    await new Promise(resolve => setTimeout(resolve, 1000));
    await page.evaluate((xpath) => {
        const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (element) { 
            element.click();//點擊找到的按鈕
        } else {
            throw new Error(`Element with XPath ${xpath} not found.`);
        }
    }, xpath);
    expect(xpath).toBeTruthy(); // 检查按钮是否存在
  });
  test('檢查該頁面標題', async () => {
    await page.waitForSelector('.flex.items-center.gap-2.text-lg', { timeout: 60000 });
    const WelcomeText = await page.$eval('.flex.items-center.gap-2.text-lg', element => element.textContent.trim());
    assert.equal(WelcomeText, 'กระเป๋า', 'text is incorrect');
      // 等待彈窗並加上時間讓他完全顯示
    await new Promise(resolve => setTimeout(resolve, 2000)); 
  });
  // test('檢查該頁面標題-版本2', async () => {
  //   const xpath = '//div[contains(@class, "flex items-center gap-2 text-lg")]';

  //   // 等待元素出現
  //   await page.waitForXPath(xpath, { timeout: 60000 });
    
  //   // 使用 XPath 查找元素
  //   const [elementHandle] = await page.$x(xpath);
  //   const WelcomeText = await page.evaluate(element => element.textContent.trim(), elementHandle);
    
  //   // 驗證文字內容
  //   assert.equal(WelcomeText, 'บัญชีคุณaaaa', 'Admin setting element text is incorrect');
  // });
  test('檢查左側清單存在投注記錄', async () => {
    //await page.goto('https://dev.botan888.co/wallet/balance', { waitUntil: "domcontentloaded" });
    const xpath = "//*[text()='ประวัติการเดิมพัน']";
    await new Promise(resolve => setTimeout(resolve, 1000));
    await page.evaluate((xpath) => {
        const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (!element) {
          throw new Error(`Element with XPath ${xpath} not found.`);
        }
    }, xpath);
    expect(xpath).toBeTruthy(); // 检查按钮是否存在
  });
  test('檢查左側清單存在交易記錄', async () => {
    //await page.goto('https://dev.botan888.co/wallet/balance', { waitUntil: "domcontentloaded" });
    const xpath = "//*[text()='ประวัติการทำธุรกรรม']";
    await new Promise(resolve => setTimeout(resolve, 1000));
    await page.evaluate((xpath) => {
        const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (!element) {
          throw new Error(`Element with XPath ${xpath} not found.`);
        }
    }, xpath);
    expect(xpath).toBeTruthy(); // 检查按钮是否存在
  });
  test('檢查左側清單存在派獎記錄', async () => {
    //await page.goto('https://dev.botan888.co/wallet/balance', { waitUntil: "domcontentloaded" });
    const xpath = "//*[text()='ประวัติการรับโบนัส']";
    await new Promise(resolve => setTimeout(resolve, 1000));
    await page.evaluate((xpath) => {
        const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (!element) {
          throw new Error(`Element with XPath ${xpath} not found.`);
        }
    }, xpath);
    expect(xpath).toBeTruthy(); // 检查按钮是否存在
  });
  
});
describe.skip('檢查footer區塊', () => {
  
  // test.skip('檢查贊助商圖片', async () => {
  //   //await page.waitForSelector('._image_hke5k_18', { timeout: 60000 });
  //   await page.waitForSelector('.ant-row.ant-row-center.ant-row-middle', { timeout: 60000 });
  //   const Sponsorssrc = [
  //     "/assets/gaming-CBVzKF2H.png",
  //     "/assets/gaming-1-BOzmrkrN.png",
  //     "/assets/gaming-2-D49F9KYV.png",
  //   ];
  
  //   for (const src of Sponsorssrc) {
  //     const SponsorsImage = await page.$(`img[src="${src}"]`);
  //     expect(SponsorsImage).toBeTruthy(); // 確認圖片存在
  //   }
  // });
  test('檢查遊戲商圖片', async () => {
    await page.waitForSelector('.ant-col.ant-col-24.ant-col-sm-24 img[alt="game-provider"]', { timeout: 60000 });
    
    const gameproviderImages = await page.$$('.ant-col.ant-col-24.ant-col-sm-24 img[alt="game-provider"]');
    expect(gameproviderImages.length).toBe(8);
  });
  test('檢查底下連結', async () => {
    await page.waitForSelector('div.ant-col ul li', { timeout: 60000 });
  
    const expectedTexts = [
      "สล็อต",
      "Gamble Aware",
      "คำถามที่พบบ่อย",
      "เงื่อนไขการให้บริการ"
    ];
  
    // 提取 _list_17qkg_11 中的所有子元素的文本
    const listItemsTextContent = await page.$$eval('div.ant-col ul li', elements =>
      elements.map(el => el.textContent.trim())
    );

    // 確認每個預期的文本是否出現在 listItemsTextContent 中
    for (const text of expectedTexts) {
      const found = listItemsTextContent.some(item => item.includes(text));
      expect(found).toBeTruthy(); // 確認文本存在
    }
  });
  test('檢查社群軟體區塊是否存在', async () => {
    for (const platform of socialMedia) {
      await page.waitForSelector(`.flex.items-center.flex-wrap.justify-center img[alt="${platform}"]`, { timeout: 60000 });
      const element = await page.$(`.flex.items-center.flex-wrap.justify-center img[alt="${platform}"]`);
      expect(element).toBeTruthy();
    }
  });
  test('檢查 logo 和版權聲明', async () => {
    // 等待元素加載
    await page.waitForSelector('.flex.flex-col.items-center', { timeout: 60000 });
  
    // 檢查 logo 的 src 是否存在
    const logoImage = await page.$('img[src="/assets/logo-D7mm_G3_.png"]');
    expect(logoImage).toBeTruthy(); // 確認圖片存在
  
    // 檢查版權聲明的文本是否正確
    const copyrightText = await page.$eval('small.mb-2', el => el.textContent.trim());
    expect(copyrightText).toBe('© 2024 Casino.com | All Rights Reserved');
  });
  test('檢查宣告區塊是否存在', async () => {
    await page.waitForSelector('.pb-10._remind-text_aq2p6_1', { timeout: 60000 });
    const expectedTexts = [
      "casino ดำเนินการภายใต้ใบอนุญาตแบบไม่ผูกขาดที่ Small House B.V",
      "ซึ่งเป็นบริษัทที่จดทะเบียนใน Curacao หมายเลขบริษัท 163888 และมีที่อยู่จดทะเบียนที่:",
      "Zuikertuintjeweg Z/N, Curacao"
    ];
  
    // 提取 .pb-10._remind-text_aq2p6_1 中的所有子元素的文本
    const listItemsTextContent = await page.$$eval('.pb-10._remind-text_aq2p6_1 > *', elements =>
      elements.map(el => el.textContent.trim())
    );

    // 確認每個預期的文本是否出現在 listItemsTextContent 中
    for (const text of expectedTexts) {
      const found = listItemsTextContent.some(item => item.includes(text));
      expect(found).toBeTruthy(); // 確認文本存在
    }
  });
  });