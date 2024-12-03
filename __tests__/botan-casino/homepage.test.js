// 指定跑哪一個檔案 npx jest __tests__/xxxxxx.test.js
const puppeteer = require('puppeteer');
const assert = require('assert');
const { bannersrc, bannerAlts, socialMedia,navopentexts,navdisabletexts,gameprovidersrc} = require('../bannerSources');
const { checkExist } = require('../utils.js');

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
  
  test('檢查八個遊戲icon存在', async () => {
    await page.waitForSelector('#dashboard-scroll-container img.ant-image-img.h-full', { timeout: 60000 });
    
    const altTexts = ["PG", "JILI", "PP", "CQ9", "JDB", "FC", "EVO", "BNG"];
    for (const alt of altTexts) {
      const img = await page.$(`#dashboard-scroll-container img.ant-image-img.h-full[alt="${alt}"]`);
      expect(img).toBeTruthy(); // 確認圖片存在
    }
  });
  test('檢查八個遊戲商 icon圖片連結', async () => {
    await page.waitForSelector('.swiper-wrapper .ant-image-img.h-full[src]', { timeout: 60000 });
    
    const bannerSources = await page.evaluate(() => {
      const images = document.querySelectorAll('.swiper-wrapper .ant-image-img.h-full[src]');
      return Array.from(images).map(img => img.getAttribute('src'));
    });
  
    // 使用 checkExist 函数来检查是否存在这些图片的 src
    checkExist(bannerSources, gameprovidersrc, '遊戲商大icon 圖片');  // 傳入測試名稱
  });
  test('檢查多張 banner 圖片是否存在', async () => {
    await page.waitForSelector('.swiper-slide img[alt]', { timeout: 60000 });
    
    const bannerSources = await page.evaluate(() => {
      const images = document.querySelectorAll('.swiper-slide img[alt]');
      return Array.from(images).map(img => img.getAttribute('alt'));
    });
  
    checkExist(bannerSources, bannerAlts, 'Banner alt');

  });
  test('檢查多張 banner 圖片連結', async () => {
    
    await page.waitForSelector('.swiper-slide img[src]', { timeout: 60000 });
  
    // 获取页面上所有图片的 src 属性
    const bannerSources = await page.evaluate(() => {
      const images = document.querySelectorAll('.swiper-slide img[src]');
      return Array.from(images).map(img => img.getAttribute('src'));
    });
  
    // 使用 checkExist 函数来检查是否存在这些图片的 src
    checkExist(bannerSources, bannersrc, 'Banner 圖片');  // 傳入測試名稱
  });
  test('檢查首頁預設載入遊戲數量大於或等於20', async () => {
    // 等待指定範圍內的圖片加載完成
    await page.waitForSelector('.group.flex.flex-col .ant-image img.ant-image-img[src]', { timeout: 60000 });
  
    // 獲取限定區域內的圖片元素
    const gameproviderImages = await page.$$('.group.flex.flex-col .ant-image img.ant-image-img[src]');
    
    // 驗證圖片數量是否大於或等於20
    expect(gameproviderImages.length).toBeGreaterThanOrEqual(20);
  });
  test('檢查贊助商圖片', async () => {
    //await page.waitForSelector('._image_hke5k_18', { timeout: 60000 });
    await page.waitForSelector('.ant-row.ant-row-center.ant-row-middle', { timeout: 60000 });
    const Sponsorssrc = [
      "/assets/gaming-CBVzKF2H.png",
      "/assets/gaming-1-BOzmrkrN.png",
      "/assets/gaming-2-D49F9KYV.png",
    ];
  
    for (const src of Sponsorssrc) {
      const SponsorsImage = await page.$(`img[src="${src}"]`);
      expect(SponsorsImage).toBeTruthy(); // 確認圖片存在
    }
  });
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
  test('檢查右下角客服按鈕並點擊', async () => {
    // 等待按鈕元素可見
    await page.waitForSelector('.flex.item-center img[alt="service icon"]', { timeout: 10000 });
    
    // 點擊按鈕
    await page.click('.flex.item-center img[alt="service icon"]');

    // 驗證點擊後是否出現新的 DOM 結構
    await page.waitForSelector('div[class*="_tool-box"][class*="-open"]', { timeout: 10000 });
    const isToolBoxOpen = await page.$('div[class*="_tool-box"][class*="-open"]') !== null;

    // 驗證是否點擊成功
    expect(isToolBoxOpen).toBe(true);
    const serviceIconsCount = await page.evaluate(() => {
      return document.querySelectorAll('div[class*="_tool-box"][class*="-open"] img[alt="service icon"]').length;
  });
  expect(serviceIconsCount).toBe(3);
  });
//   test('檢查右下角客服按鈕並點擊-v2', async () => {
//     const xpath = '//div[contains(@class, "flex item-center")]//img[@alt="service icon"]';

//     // 使用 XPath 查找按鈕
//     const result = await page.evaluate((xpath) => {
//       const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
//         if (element) {
//             element.click(); // 點擊找到的按鈕
//             return { success: true, message: '按鈕已成功點擊' };
//         } else {
//             return { success: false, message: `未找到按鈕，XPath: ${xpath}` };
//         }
//     }, xpath);

//     // 驗證按鈕是否被點擊
//     expect(result.success).toBe(true);

//     // 驗證點擊後是否出現新的 DOM 結構
//     const isToolBoxOpen = await page.evaluate(() => {
//         return document.querySelector('div[class*="_tool-box"][class*="-open"]') !== null;
//     });
//     expect(isToolBoxOpen).toBe(true);

//     // 驗證 alt="service icon" 的圖片數量
//     const serviceIconsCount = await page.evaluate(() => {
//         return document.querySelectorAll('div[class*="_tool-box"][class*="-open"] img[alt="service icon"]').length;
//     });
//     expect(serviceIconsCount).toBe(3);
// });
test('檢查頁面向下滾並點擊totop按鈕', async () => {

  // 模擬頁面滾動
  await page.evaluate(() => {
    const element = document.querySelector('.flex.flex-col.items-center');
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
});

  // 等待「回到頂部」按鈕出現
  const buttonSelector = 'img[alt="go top icon"]';
  await page.waitForSelector(buttonSelector, { timeout: 10000 });

  // 確認按鈕是否出現
  const button = await page.$(buttonSelector);
  expect(button).not.toBeNull(); // 確保按鈕存在
  await new Promise(resolve => setTimeout(resolve, 5000));// 為了看到向下滾動 多停留幾秒
  // 點擊「回到頂部」按鈕
  await page.click(buttonSelector);

  // 等待頁面滾動回頂部
  await new Promise(resolve => setTimeout(resolve, 1000));// 等待一秒鐘

  // 驗證頁面是否回到頂部，可以檢查滾動位置
  const scrollY = await page.evaluate(() => window.scrollY);
  expect(scrollY).toBe(0); // scrollY 為 0 表示頁面未滾動，處於頂部狀態。如果頁面有滾動，這個值就會大於 0
});
  });
describe('檢查左側清單', () => {
  
  test('檢查左側已開放清單', async () => {
    
    await page.waitForSelector("div[class*='_menu-title']", { timeout: 60000 });
    
    const altValues = ['熱門', '優惠活動', '所有遊戲廠商'];

    const titles = await page.evaluate((alts) => {
      const selectors = alts.map(alt => `div[class*='_menu_'] img[alt='${alt}'] ~ div[class*='_menu-title']`).join(', ');
      const elements = document.querySelectorAll(selectors);
      return Array.from(elements).map(el => el.textContent.trim());
    }, altValues);

    checkExist(titles, navopentexts, '已開放清單');  // 傳入測試名稱
    
  });
  test('檢查左側未開放清單', async () => {
    await page.waitForSelector("div[class*='_menu-title-disabled']", { timeout: 60000 });
    //const expectedTexts = ["สร้างรายได้","โบนัส","เกมโปรดaaa","เกมโaaa"];
    
    const titles = await page.evaluate(() => {
      const elements = document.querySelectorAll("div[class*='_menu-title-disabled']");
      return Array.from(elements).map(el => el.textContent.trim());
    });
  
    checkExist(titles, navdisabletexts, '未開放清單');  // 傳入測試名稱
  
  //checkTitlesExist(titles, navdisabletexts, '未開放清單');  // 傳入測試名稱
  });
  test('檢查左側最上方兩個清單', async () => {
    //await page.waitForSelector('._menu-title_z4ojk_64', { timeout: 60000 });
  
    const expectedTexts = ["ภารกิจ","หมุนกงล้อ"];
    
    // 提取所有 _menu-title_1u7zk_50 的文本內容
    // const titles = await page.$$eval('._menu-title_z4ojk_64', elements =>
    //   elements.map(el => el.textContent.trim())
    // );
    const titles = await page.evaluate(() => {
      const elements = document.querySelectorAll("div.menu-box[style*='linear-gradient'] div[class*='_menu-title']"); //使用雙重屬性定位到上方兩張圖
      return Array.from(elements).map(el => el.textContent.trim());
    });
  
  
    const missingTexts = [];

  // 確認每個預期文本是否存在於提取的文本列表中
  for (const text of expectedTexts) {
    const found = titles.includes(text);
    if (!found) {
      missingTexts.push(text); // 如果找不到，將文本儲存到 missingTexts 陣列中
    }
  }

  // 如果有未找到的文本，列印出來
  if (missingTexts.length > 0) {
    console.log('最上方兩個清單沒出現:', missingTexts.join(', '));
  }

  // 確保所有預期文本都找到了
  for (const text of expectedTexts) {
    const found = titles.includes(text);
    expect(found).toBeTruthy(); // 確認文本存在
  }
  });
  });
