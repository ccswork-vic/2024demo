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
    const bannerAlts = [
      "สมัครสมาชิก รับ 1,000",
      "โปรโมชั่นฝากเงินครั้งแรก",
      "ฝากครั้งที่สอง รับโบนัส 50% เพิ่มโอกาสชนะ",
      "รับเงินรางวัล $150,000 ทุกสัปดาห์!",
    ];
    for (const altText of bannerAlts) {
      const bannerImage = await page.$(`img._banner-image_5t1u6_75[alt="${altText}"]`);
      expect(bannerImage).toBeTruthy(); // 確認圖片存在
    }
  });
  test('檢查多張 banner 圖片連結', async () => {
    await page.waitForSelector('.swiper-wrapper img._banner-image_5t1u6_75', { timeout: 60000 });
    
    const bannersrc = [
      "https://dev.botan888.co/images/Promotion_bonus100percent_TH_900.webp",
      "https://dev.botan888.co/images/Promotion_seconddepositbonus_TH_900_v2.webp",
      "/assets/banner1-C5Qfv-L4.webp",
      "/assets/banner2-CmT3qWpg.webp",
    ];
  
    for (const src of bannersrc) {
      const bannerImage = await page.$(`img._banner-image_5t1u6_75[src="${src}"]`);
      expect(bannerImage).toBeTruthy(); // 確認圖片存在
    }
  });
});