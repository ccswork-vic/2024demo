// 指定跑哪一個檔案 npx jest __tests__/xxxxxx.test.js
const puppeteer = require('puppeteer');
const assert = require('assert');
const { socialMedia,gameControlButtons} = require('../../utils/botanSources.js');
const { checkExist } = require('../../utils/utils.js');

let browser;
let page;
jest.setTimeout(60000);

beforeAll(async () => {

  browser = await puppeteer.launch({
    headless: false, // 设置为 true 则在无头模式下运行测试
    defaultViewport: false // 关闭默认视窗
  });
  page = await browser.newPage();
  await page.goto('https://dev.botan888.co/casino/home?modal=auth&tab=login', { waitUntil: "domcontentloaded" });
  await page.waitForSelector('#validateOnly_account', { timeout: 60000 });

  // 登录
  await page.type('#validateOnly_account', '0999111115');
  await page.type('#validateOnly_password', 'aaaa1234');
  await page.click("#validateOnly > div.ant-form-item.mb-0 > div > div > div > div > button");
  await page.waitForSelector('#validateOnly > div.ant-form-item.mb-0 > div > div > div > div > button', { timeout: 60000 });
});

afterAll(async () => {
  await browser.close();
});

describe('檢查首頁基本元素', () => {
  
  test('檢查首頁老虎機區塊第一個遊戲，檢查遊戲控制三顆按鈕', async () => {
    // 等待指定範圍內的圖片加載完成
    await page.waitForSelector('.group.flex.flex-col .ant-image img.ant-image-img[src]', { timeout: 60000 });
    await new Promise(resolve => setTimeout(resolve, 4000));
    //await page.goto('https://dev.botan888.co/casino/game/1', { waitUntil: "domcontentloaded" });
    
    const gameproviderImages = await page.$$('.group.flex.flex-col .ant-image img.ant-image-img[src]');
    await new Promise(resolve => setTimeout(resolve, 4000));
    await page.click('.ant-image img[src="https://storage.googleapis.com/assets_jf/icons/en-us/104014093.png"]');
    await new Promise(resolve => setTimeout(resolve, 4000));

    await page.waitForSelector('.my-5 .gap-2 .ant-btn span', { visible: true, timeout: 60000 });
    
    // 驗證遊戲控制按鈕
    await new Promise(resolve => setTimeout(resolve, 2000));
    const buttons = await page.$$eval('.my-5 .gap-2 .ant-btn span', spans =>
        spans.map(span => span.textContent.trim()).filter(text => text !== '')
      );
      checkExist(buttons, gameControlButtons, '遊戲控制按鈕');
    });

  });
  describe('檢查footer區塊', () => {
    test('檢查botan logo', async () => {
      const logoImage = await page.$('img[src="/assets/logo-D7mm_G3_.png"]');
      expect(logoImage).toBeTruthy(); // 確認圖片存在
    });
    test('檢查遊戲商圖片', async () => {
      await page.waitForSelector('.ant-row.ant-row-start img[alt="game-provider"]', { timeout: 60000 });
      
      const gameproviderImages = await page.$$('.ant-row.ant-row-start img[alt="game-provider"]');
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
        await page.waitForSelector(`svg[aria-label="${platform}"]`, { timeout: 60000 });
        const element = await page.$(`svg[aria-label="${platform}"]`);
        expect(element).toBeTruthy();
      }
    });
    test('檢查 版權聲明', async () => {
      // // 等待元素加載
      await new Promise(resolve => setTimeout(resolve, 2000));// 等待一秒鐘
       await page.waitForSelector('.flex.justify-between.items-center.mb-\\[24px\\] span.text-\\[gray\\]', { timeout: 6000 });
  
      // 檢查版權聲明的文本是否正確
      const copyrightText = await page.$eval('.flex.justify-between.items-center.mb-\\[24px\\] span.text-\\[gray\\]', el => el.textContent.trim());
      expect(copyrightText).toBe('© 2024 Casino.com | All Rights Reserved');
    });
    test('檢查宣告區塊是否存在', async () => {
      await page.waitForSelector('._remind-text_2honh_1', { timeout: 60000 });
      const expectedTexts = [
        "casino ดำเนินการภายใต้ใบอนุญาตแบบไม่ผูกขาดที่ Small House B.V",
        "Zuikertuintjeweg Z/N, Curacao",
        "ซึ่งเป็นบริษัทที่จดทะเบียนใน Curacao หมายเลขบริษัท 163888 และมีที่อยู่จดทะเบียนที่:"
      ];
    
      // 提取 .pb-10._remind-text_aq2p6_1 中的所有子元素的文本
      const listItemsTextContent = await page.$$eval('._remind-text_2honh_1', elements =>
        elements.map(el => el.textContent.trim())
      );
  
      // 確認每個預期的文本是否出現在 listItemsTextContent 中
      for (const text of expectedTexts) {
        const found = listItemsTextContent.some(item => item.includes(text));
        expect(found).toBeTruthy(); // 確認文本存在
      }
    });
    });
