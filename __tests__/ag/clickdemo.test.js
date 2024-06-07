// 指定跑哪一個檔案 npx jest __tests__/xxxxxx.test.js
//加上看log 語法npx jest --silent=false __tests__/ag/ag-checksubmenu.test.js
//在 macOS 上，默认快捷键是 Option + Shift + F。
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

describe('點統計報表子目錄', () => {
    test('點擊對帳報表', async () => {
            await page.waitForSelector('#root > div > div > div > aside > div > div._menu_t2mh1_44 > ul > li:nth-child(3) > div', { timeout: 60000 });
            await page.click('#root > div > div > div > aside > div > div._menu_t2mh1_44 > ul > li:nth-child(3) > div'); // 點統計報表
            // 等待子菜单展開
            await new Promise(resolve => setTimeout(resolve, 1000)); // 等待1秒鐘，確保子菜單展開
            //直接點擊
        //const xpath = "/html/body/div/div/div/div/aside/div/div[2]/ul/li[3]/ul/li[1]/span/a";
        const xpath = "//ul[starts-with(@id, 'rc-menu-uuid-') and contains(@id, '-report-popup')]/li[2]/span/a";
        await new Promise(resolve => setTimeout(resolve, 1000));
        await page.evaluate((xpath) => {
            const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            if (element) {
                element.click();
            } else {
                throw new Error(`Element with XPath ${xpath} not found.`);
            }
        }, xpath);
        await new Promise(resolve => setTimeout(resolve, 1000));
        });
    test('點擊投注與玩家', async () => {
          await page.waitForSelector('#root > div > div > div > aside > div > div._menu_t2mh1_44 > ul > li:nth-child(3) > div', { timeout: 60000 });
          //await page.click('#root > div > div > div > aside > div > div._menu_t2mh1_44 > ul > li:nth-child(3) > div'); // 點統計報表
          // 等待子菜单展開
          await new Promise(resolve => setTimeout(resolve, 1000)); // 等待1秒鐘，確保子菜單展開
          //直接點擊
      //const xpath = "/html/body/div/div/div/div/aside/div/div[2]/ul/li[3]/ul/li[1]/span/a";
      const xpath = "//*[text()='投注與玩家']";
      //$x('//*[text()="在線玩家" or text()="壓碼量" or text()="輸贏報表"]')
      await new Promise(resolve => setTimeout(resolve, 1000));
      await page.evaluate((xpath) => {
          const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
          if (element) {
              element.click();
          } else {
              throw new Error(`Element with XPath ${xpath} not found.`);
          }
      }, xpath);
      await new Promise(resolve => setTimeout(resolve, 1000));
      });   
});
describe('點帳目查詢子目錄', () => {
    test('點擊現金轉帳', async () => {
      await page.waitForSelector('#root > div > div > div > aside > div > div._menu_t2mh1_44 > ul > li:nth-child(5) > div', { timeout: 60000 });
      await page.click('#root > div > div > div > aside > div > div._menu_t2mh1_44 > ul > li:nth-child(5) > div'); // 點統計報表
      // 等待子菜单展開
      await new Promise(resolve => setTimeout(resolve, 2000)); // 等待1秒鐘，確保子菜單展開
      //直接點擊
  //const xpath = "/html/body/div/div/div/div/aside/div/div[2]/ul/li[3]/ul/li[1]/span/a";
  const xpath = "//ul[starts-with(@id, 'rc-menu-uuid-') and contains(@id, '-statement-popup')]/li[1]/span/a";
  await new Promise(resolve => setTimeout(resolve, 1000));
  await page.evaluate((xpath) => {
      const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
      if (element) {
          element.click();
      } else {
          throw new Error(`Element with XPath ${xpath} not found.`);
      }
  }, xpath);
  await new Promise(resolve => setTimeout(resolve, 1000));
  });
});
describe('點快速搜尋子目錄', () => {
    test('點擊依玩家ID查詢', async () => {
      const xpathForsearch = "//*[text()='快速搜尋']";

      // 等待元素出现
      await page.waitForFunction((xpath) => {
          const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
          return result.singleNodeValue !== null;
      }, { timeout: 60000 }, xpathForsearch);

      // 点击元素
      await page.evaluate((xpath) => {
          const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
          const element = result.singleNodeValue;
          if (element) {
              element.click();
          } else {
              throw new Error(`Element with XPath ${xpath} not found.`);
          }
      }, xpathForsearch);


        //await page.waitForSelector('//*[@id="root"]/div/div/div/aside/div/div[2]/ul/li[4]/div', { timeout: 60000 });
        //await page.click('//*[@id="root"]/div/div/div/aside/div/div[2]/ul/li[4]/div'); // 點統計報表
        // 等待子菜单展開
        await new Promise(resolve => setTimeout(resolve, 1000)); // 等待1秒鐘，確保子菜單展開
        //直接點擊
    //const xpath = "/html/body/div/div/div/div/aside/div/div[2]/ul/li[3]/ul/li[1]/span/a";
    const xpath = "//*[text()='依玩家ID查詢']";
    await new Promise(resolve => setTimeout(resolve, 1000));
    await page.evaluate((xpath) => {
        const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (element) {
            element.click();
        } else {
            throw new Error(`Element with XPath ${xpath} not found.`);
        }
    }, xpath);
    await new Promise(resolve => setTimeout(resolve, 1000));
    })
    test('點擊依單號查詢', async () => {
        //     await page.waitForSelector('#root > div > div > div > aside > div > div._menu_t2mh1_44 > ul > li:nth-child(4) > div', { timeout: 60000 });
        //     //await page.click('#root > div > div > div > aside > div > div._menu_t2mh1_44 > ul > li:nth-child(4) > div'); // 點統計報表
        //     // 等待子菜单展開
        //     await new Promise(resolve => setTimeout(resolve, 1000));
        // const xpathForsearch = "//*[text()='快速搜尋']";
  
        // // 等待元素出现
        // await page.waitForFunction((xpath) => {
        //     const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
        //     return result.singleNodeValue !== null;
        // }, { timeout: 60000 }, xpathForsearch);
  
        // // 点击元素
        // await page.evaluate((xpath) => {
        //     const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
        //     const element = result.singleNodeValue;
        //     if (element) {
        //         element.click();
        //     } else {
        //         throw new Error(`Element with XPath ${xpath} not found.`);
        //     }
        // }, xpathForsearch);
  
  
        //   //await page.waitForSelector('//*[@id="root"]/div/div/div/aside/div/div[2]/ul/li[4]/div', { timeout: 60000 });
        //   //await page.click('//*[@id="root"]/div/div/div/aside/div/div[2]/ul/li[4]/div'); // 點統計報表
        //   // 等待子菜单展開
        //   await new Promise(resolve => setTimeout(resolve, 1000)); // 等待1秒鐘，確保子菜單展開
          //直接點擊
      //const xpath = "/html/body/div/div/div/div/aside/div/div[2]/ul/li[3]/ul/li[1]/span/a";
      const xpath = "//*[text()='依單號查詢']";
      await new Promise(resolve => setTimeout(resolve, 1000));
      await page.evaluate((xpath) => {
          const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
          if (element) {
              element.click();
          } else {
              throw new Error(`Element with XPath ${xpath} not found.`);
          }
      }, xpath);
      await new Promise(resolve => setTimeout(resolve, 1000));
      })
});



