// 指定跑哪一個檔案 npx jest __tests__/xxxxxx.test.js
const puppeteer = require('puppeteer');
const assert = require('assert');
const { bannersrc, bannerAlts } = require('../bannerSources');

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
  await page.type('#validateOnly_account', '0999111111');
  await page.type('#validateOnly_password', 'aaaa1234');
  await page.click("#validateOnly > div.ant-form-item.mb-0.css-1dwc1ye > div > div > div > div > button");
  await page.waitForSelector('#validateOnly > div.ant-form-item.mb-0.css-1dwc1ye > div > div > div > div > button', { timeout: 60000 });
});

afterAll(async () => {
  await browser.close();
});

describe('檢查首頁基本元素', () => {
  
  test('檢查特定遊戲 icon', async () => {
    await page.waitForSelector('#dashboard-scroll-container img.ant-image-img.h-full', { timeout: 60000 });
    
    const altTexts = ["PG", "JILI", "PP", "CQ9", "JDB", "FC", "EVO", "BNG"];
    for (const alt of altTexts) {
      const img = await page.$(`#dashboard-scroll-container img.ant-image-img.h-full[alt="${alt}"]`);
      expect(img).toBeTruthy(); // 確認圖片存在
    }
  });

  test('檢查多張 banner 圖片是否存在', async () => {
    await page.waitForSelector('.swiper-wrapper img._banner-image_5t1u6_75', { timeout: 60000 });
    // const bannerAlts = [
    //   "สมัครสมาชิก รับ 1,000",
    //   "โปรโมชั่นฝากเงินครั้งแรก",
    //   "ฝากครั้งที่สอง รับโบนัส 50% เพิ่มโอกาสชนะ",
    //   "รับเงินรางวัล $150,000 ทุกสัปดาห์!",
    // ];
    for (const altText of bannerAlts) {
      const bannerImage = await page.$(`img._banner-image_5t1u6_75[alt="${altText}"]`);
      expect(bannerImage).toBeTruthy(); // 確認圖片存在
    }
  });
  test('檢查多張 banner 圖片連結', async () => {
    await page.waitForSelector('.swiper-wrapper img._banner-image_5t1u6_75', { timeout: 60000 });
    
    // const bannersrc = [
    //   "https://dev.botan888.co/images/Promotion_bonus100percent_TH_900.webp",
    //   "https://dev.botan888.co/images/Promotion_seconddepositbonus_TH_900_v2.webp",
    //   "/assets/banner1-C5Qfv-L4.webp",
    //   "/assets/banner2-CmT3qWpg.webp",
    // ];
  
    for (const src of bannersrc) {
      const bannerImage = await page.$(`img._banner-image_5t1u6_75[src="${src}"]`);
      expect(bannerImage).toBeTruthy(); // 確認圖片存在
    }
  });
  test('檢查贊助商圖片', async () => {
    await page.waitForSelector('._image_hke5k_18', { timeout: 60000 });
    
    const Sponsorssrc = [
      "/assets/gaming-CBVzKF2H.png",
      "/assets/gaming-1-BOzmrkrN.png",
      "/assets/gaming-2-D49F9KYV.png",
    ];
  
    for (const src of Sponsorssrc) {
      const SponsorsImage = await page.$(`img._image_hke5k_18[src="${src}"]`);
      expect(SponsorsImage).toBeTruthy(); // 確認圖片存在
    }
  });
  test('檢查遊戲商圖片', async () => {
    await page.waitForSelector('._image_jaitl_18', { timeout: 60000 });
    
    const gameproviderImages = await page.$$('._image_jaitl_18');
    expect(gameproviderImages.length).toBe(8);
  });
  test('檢查底下連結', async () => {
    await page.waitForSelector('._list_17qkg_11', { timeout: 60000 });
  
    const expectedTexts = [
      "สล็อต",
      "Gamble Aware",
      "คำถามที่พบบ่อย",
      "เงื่อนไขการให้บริการ"
    ];
  
    // 提取 _list_17qkg_11 中的所有子元素的文本
    const listItemsTextContent = await page.$$eval('._list_17qkg_11 > *', elements =>
      elements.map(el => el.textContent.trim())
    );

    // 確認每個預期的文本是否出現在 listItemsTextContent 中
    for (const text of expectedTexts) {
      const found = listItemsTextContent.some(item => item.includes(text));
      expect(found).toBeTruthy(); // 確認文本存在
    }
  });
  test('檢查社群軟體區塊是否存在', async () => {
    await page.waitForSelector('._community-icon_17qkg_42', { timeout: 60000 });
    const communityAlts = [
      "facebook",
      "line",
      "telegram",
    ];
    for (const altText of communityAlts) {
      const communityalt = await page.$(`._community-icon_17qkg_42[alt="${altText}"]`);
      expect(communityalt).toBeTruthy(); // 確認fb line telegram 存在
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
  test.skip('檢查宣告區塊是否存在', async () => {
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

 
