// 指定跑哪一個檔案 npx jest __tests__/xxxxxx.test.js
const puppeteer = require('puppeteer');
const assert = require('assert');
const {  socialMedia,promotionbanners} = require('../../utils/botanSources.js');
const { checkExist } = require('../../utils/utils.js');

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

describe('點擊โปรโมชั่น', () => {
  test('點promotion進入活動頁面', async () => {
    //await page.goto('https://dev.botan888.co/wallet/balance', { waitUntil: "domcontentloaded" });
    const xpath = "//*[text()='โปรโมชั่น']";
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
  test('檢查活動一註冊送標題', async () => {
    await page.waitForSelector('.flex.flex-col > .text-lg', { timeout: 60000 });
    const WelcomeText = await page.$eval('.flex.flex-col > .text-lg', element => element.textContent.trim());
    assert.equal(WelcomeText, 'สมัครสมาชิก รับ 1,000', 'text is incorrect');
      // 等待彈窗並加上時間讓他完全顯示
    await new Promise(resolve => setTimeout(resolve, 2000)); 
  });
  test('檢查活動二的標題', async () => {
    // 找到包含目標圖片的卡片
    //const cardSelector = `.ant-card-cover img[src="${promotionbanners.activity2}"]`;
    const cardSelector = '.ant-card:nth-of-type(2) .ant-card-cover img';

    // 等待圖片出現，確保卡片已加載
    await page.waitForSelector(cardSelector, { timeout: 60000 });

    // 從圖片找到父容器，然後提取標題
    const activityTitle = await page.$eval(cardSelector, img => {
    const card = img.closest('.ant-card');
    return card.querySelector('.ant-card-body .flex.flex-col > .text-lg').textContent.trim();
    });

    // 驗證標題文字是否正確
    assert.equal(
        activityTitle,
        'โปรโมชั่นฝากเงินครั้งแรก',
        `Expected 'โปรโมชั่นฝากเงินครั้งแรก' but found '${activityTitle}'`
    );
  });
  test('檢查活動三的標題', async () => {
    // 找到包含目標圖片的卡片
    //const cardSelector = `.ant-card-cover img[src="${promotionbanners.activity3}"]`;
    const cardSelector = '.ant-card:nth-of-type(3) .ant-card-cover img';

    // 等待圖片出現，確保卡片已加載
    await page.waitForSelector(cardSelector, { timeout: 60000 });

    // 從圖片找到父容器，然後提取標題
    const activityTitle = await page.$eval(cardSelector, img => {
    const card = img.closest('.ant-card');
    return card.querySelector('.ant-card-body .flex.flex-col > .text-lg').textContent.trim();
    });

    // 驗證標題文字是否正確
    assert.equal(
        activityTitle,
        'ฝากครั้งที่สอง รับโบนัส 50% เพิ่มโอกาสชนะ',
        `Expected 'โปรโมชั่นฝากเงินครั้งแรก' but found '${activityTitle}'`
    );
  });
  test('檢查活動四的標題', async () => {
    // 找到包含目標圖片的卡片
    //const cardSelector = `.ant-card-cover img[src="${promotionbanners.activity4}"]`;
    const cardSelector = '.ant-card:nth-of-type(4) .ant-card-cover img';

    // 等待圖片出現，確保卡片已加載
    await page.waitForSelector(cardSelector, { timeout: 60000 });

    // 從圖片找到父容器，然後提取標題
    const activityTitle = await page.$eval(cardSelector, img => {
    const card = img.closest('.ant-card');
    return card.querySelector('.ant-card-body .flex.flex-col > .text-lg').textContent.trim();
    });

    // 驗證標題文字是否正確
    assert.equal(activityTitle,'ปั่นทั้งวัน รับเพิ่ม 10% ทุกยอดฝาก','text is incorrect');
  });
  test('檢查活動五的標題', async () => {
    // 找到包含目標圖片的卡片
    //const cardSelector = `.ant-card-cover img[src="${promotionbanners.activity5}"]`;
    const cardSelector = '.ant-card:nth-of-type(5) .ant-card-cover img';

    // 等待圖片出現，確保卡片已加載
    await page.waitForSelector(cardSelector, { timeout: 60000 });

    // 從圖片找到父容器，然後提取標題
    const activityTitle = await page.$eval(cardSelector, img => {
    const card = img.closest('.ant-card');
    return card.querySelector('.ant-card-body .flex.flex-col > .text-lg').textContent.trim();
    });

    // 驗證標題文字是否正確
    assert.equal(activityTitle,'พุธพิเศษ! ฝาก 500 รับ 100 ทันที','text is incorrect');
  });
  test.skip('檢查所有活動標題', async () => {
    // 獲取所有卡片標題
    const cardSelectors = [
        `.ant-card-cover img[src="${promotionbanners.activity1}"]`,
        `.ant-card-cover img[src="${promotionbanners.activity2}"]`,
        `.ant-card-cover img[src="${promotionbanners.activity3}"]`
    ];

    // 取得每個卡片的標題
    const activityTitles = await Promise.all(cardSelectors.map(async (selector) => {
        await page.waitForSelector(selector, { timeout: 60000 });
        const title = await page.$eval(selector, img => {
            const card = img.closest('.ant-card');
            return card.querySelector('.ant-card-body .flex.flex-col > .text-lg').textContent.trim();
        });
        return title;
    }));

    // 使用checkExist來檢查標題
    const expectedTitles = [
        'สมัครสมาชิก รับ 1,0005566',
        'โปรโมชั่นฝากเงินครั้งแรก5566',
        'ฝากครั้งที่สอง รับโบนัส 50% เพิ่มโอกาสชนะ5566'
    ];

    checkExist(activityTitles, expectedTitles, '活動標題檢查');
  });
  test.skip('檢查活動卡片的細節按鈕總數', async () => {
    // 等待指定區塊內的 "รายละเอียด" 按鈕元素加載
    await page.waitForSelector('div.ant-card-body .flex button.ant-btn span', { timeout: 60000 });
  
    // 獲取該區塊內所有 "รายละเอียด" 按鈕的數量
    const detailsButtons = await page.$$eval('div.ant-card-body .flex button.ant-btn span', spans => 
      spans.filter(span => span.textContent.trim() === 'รายละเอียด').length
    );
  
    // 驗證按鈕的數量是否為 5 顆
    expect(detailsButtons).toBe(5);
  });
});
describe('檢查footer區塊', () => {
  test('檢查botan logo', async () => {
    const logoImage = await page.$('img[src="/assets/logo-D7mm_G3_.png"]');
    expect(logoImage).toBeTruthy(); // 確認圖片存在
  });
  test('檢查遊戲商圖片', async () => {
    await page.waitForSelector('div.flex.row img[alt="game-provider"]', { timeout: 60000 });
    
    const gameproviderImages = await page.$$('div.flex.row img[alt="game-provider"]');
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
     await page.waitForSelector('.flex.justify-between.items-center.mb-24 span.text-\\[gray\\]', { timeout: 6000 });

    // 檢查版權聲明的文本是否正確
    const copyrightText = await page.$eval('.flex.justify-between.items-center.mb-24 span.text-\\[gray\\]', el => el.textContent.trim());
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
  test('檢查客服清單按鈕', async () => {
    const serviceicon = await page.$('.flex.item-center img[alt="service icon"]');
    expect(serviceicon).toBeTruthy(); // 確認圖片存在
  });
  });