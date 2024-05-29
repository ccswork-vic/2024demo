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
  page = await browser.newPage();
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
describe('會員管理子目錄', () => {
  test('確認新增會員是否存在', async () => {
      await page.waitForSelector('#root > div > div > div > aside > div > div._menu_t2mh1_44 > ul > li:nth-child(1) > div', { timeout: 60000 });
      await page.click('#root > div > div > div > aside > div > div._menu_t2mh1_44 > ul > li:nth-child(1) > div'); // 點會員管理
      // 等待子菜单展開
      await new Promise(resolve => setTimeout(resolve, 1000)); // 等待1秒鐘，確保子菜單展開
      // 檢查新增會員是否存在
      const createaccountExists = await page.evaluate(() => {
        const links = document.querySelectorAll('a');
        let createaccountFound = false;
        links.forEach(link => {
          if (link.textContent.trim() === '新增會員') {
            createaccountFound = true;
          }
        });
        return createaccountFound;
      });
  
      // 斷言新增會員存在
      expect(createaccountExists).toBeTruthy();
      //assert.ok(memberListExists, '會員清單不存在');
      //assert.equal(memberListExists, true, '會員清單不存在'); 
    });
  test('確認會員清單是否存在', async () => {
    await new Promise(resolve => setTimeout(resolve, 1000)); // 等待1秒鐘，確保子菜單展開
    // 檢查會員清單是否存在
    const memberListExists = await page.evaluate(() => {
      const links = document.querySelectorAll('a');
      let memberListFound = false;
      links.forEach(link => {
        if (link.textContent.trim() === '會員清單') {
          memberListFound = true;
        }
      });
      return memberListFound;
    });
    // 斷言會員清單存在
    expect(memberListExists).toBeTruthy();
  });
  test('確認新增子帳號是否存在', async () => {
    await new Promise(resolve => setTimeout(resolve, 1000)); // 等待1秒鐘，確保子菜單展開
    // 檢查新增子帳號是否存在
    const newSubAccountExists = await page.evaluate(() => {
      const links = document.querySelectorAll('a');
      let newSubAccountFound = false;
      links.forEach(link => {
        if (link.textContent.trim() === '新增子帳號') {
            newSubAccountFound = true;
        }
      });
      return newSubAccountFound;
    });
    expect(newSubAccountExists).toBeTruthy();
  });
  test('確認子帳號清單是否存在', async () => {
    await new Promise(resolve => setTimeout(resolve, 1000)); // 等待1秒鐘，確保子菜單展開
    // 檢查子帳號清單是否存在
    const subAccountListExists = await page.evaluate(() => {
      const links = document.querySelectorAll('a');
      let subAccountListFound = false;
      links.forEach(link => {
        if (link.textContent.trim() === '子帳號清單') {
            subAccountListFound = true;
        }
      });
      return subAccountListFound;
    });
    expect(subAccountListExists).toBeTruthy();
  });
});
// describe('會員管理測試', () => {
//     test('確認新增會員、會員清單、新增子帳號和子帳號清單是否存在', async () => {
//       await page.waitForSelector('#root > div > div > div > aside > div > div._menu_t2mh1_44 > ul > li:nth-child(1) > div', { timeout: 60000 });
//       await page.click('#root > div > div > div > aside > div > div._menu_t2mh1_44 > ul > li:nth-child(1) > div'); // 點會員管理
      
//       // 等待子菜單展開
//       await new Promise(resolve => setTimeout(resolve, 1000)); // 等待1秒鐘，確保子菜單展開
      
//       // 檢查每個項目是否存在
//       const menuItems = ['新增會員', '會員清單', '新增子帳號', 'aaaaa子帳號清單'];
//       const menuItemExists = await page.evaluate((menuItems) => {
//         const links = document.querySelectorAll('a');
//         const menuItemExists = {};
//         menuItems.forEach(item => {
//           menuItemExists[item] = false;
//         });
//         links.forEach(link => {
//           const linkText = link.textContent.trim();
//           if (menuItems.includes(linkText)) {
//             menuItemExists[linkText] = true;
//           }
//         });
//         return menuItemExists;
//       }, menuItems);
  
//       // 斷言每個項目存在
//       Object.entries(menuItemExists).forEach(([item, exists]) => {
//         expect(exists).toBeTruthy();
//       });
//     });
//   });
    describe('統計報表子目錄', () => {
        test('確認輸贏報表是否存在', async () => {
            await page.waitForSelector('#root > div > div > div > aside > div > div._menu_t2mh1_44 > ul > li:nth-child(3) > div', { timeout: 60000 });
            await page.click('#root > div > div > div > aside > div > div._menu_t2mh1_44 > ul > li:nth-child(3) > div'); // 點統計報表
            // 等待子菜单展開
            await new Promise(resolve => setTimeout(resolve, 1000)); // 等待1秒鐘，確保子菜單展開
            // 檢查輸贏報表是否存在
            // const winLoseReportText = await page.evaluate(() => {
            //     //const xpath = "/html/body/div/div/div/div/aside/div/div[2]/ul/li[3]/ul/li[1]/span/a";
            //     const xpath = "//ul[starts-with(@id, 'rc-menu-uuid-') and contains(@id, '-report-popup')]/li[2]/span/a";
            //     const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
            //     const link = result.singleNodeValue;
            //     return link ? link.textContent.trim() : null;
            // });
        
            // // 斷言輸贏報表存在
            // assert.strictEqual(winLoseReportText, '輸贏報表aaa');

             //檢查輸贏報表是否存在
        const winLoseReportExists = await page.evaluate(() => {
            //const xpath = "/html/body/div/div/div/div/aside/div/div[2]/ul/li[3]/ul/li[1]/span/a";
            const xpath = "//ul[starts-with(@id, 'rc-menu-uuid-') and contains(@id, '-report-popup')]/li[2]/span/a";
            const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
            const link = result.singleNodeValue;
            return link ? true : false;
        });
    
        //斷言輸贏報表存在
        expect(winLoseReportExists).toBeTruthy();

            //直接點擊
        //const xpath = "/html/body/div/div/div/div/aside/div/div[2]/ul/li[3]/ul/li[1]/span/a";
        // const xpath = "//ul[starts-with(@id, 'rc-menu-uuid-') and contains(@id, '-report-popup')]/li[2]/span/a";
        // await new Promise(resolve => setTimeout(resolve, 1000));
        // await page.evaluate((xpath) => {
        //     const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        //     if (element) {
        //         element.click();
        //     } else {
        //         throw new Error(`Element with XPath ${xpath} not found.`);
        //     }
        // }, xpath);
        // await new Promise(resolve => setTimeout(resolve, 4000));
        // });
       
});
});
describe('快速搜尋子目錄', () => {
    test('確認玩家id查詢是否存在', async () => {
        const xpathForSearch = '//*[@id="root"]/div/div/div/aside/div/div[2]/ul/li[4]/div';

        // 等待元素出现
        await page.waitForFunction((xpath) => {
            const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
            return result.singleNodeValue !== null;
        }, { timeout: 60000 }, xpathForSearch);

        // 点击元素
        await page.evaluate((xpath) => {
            const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
            const element = result.singleNodeValue;
            if (element) {
                element.click();
            } else {
                throw new Error(`Element with XPath ${xpath} not found.`);
            }
        }, xpathForSearch);

        // 等待子菜单展开
        await new Promise(resolve => setTimeout(resolve, 1000)); // 等待1秒鐘，確保子菜單展開

        // // 檢查輸贏報表是否存在expect版
        // const winLoseReportExists = await page.evaluate(() => {
        //     const xpath = "//ul[starts-with(@id, 'rc-menu-uuid-') and contains(@id, '-report-popup')]/li[2]/span/a";
        //     const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
        //     const link = result.singleNodeValue;
        //     return link ? true : false;
        // });

        // // 斷言輸贏報表存在
        // expect(winLoseReportExists).toBeTruthy();
        

        //檢查輸贏報表是否存在assert版
            const winLoseReportText = await page.evaluate(() => {
                //const xpath = "/html/body/div/div/div/div/aside/div/div[2]/ul/li[3]/ul/li[1]/span/a";
                //const xpath = "//ul[starts-with(@id, 'rc-menu-uuid-') and contains(@id, '-search-popup')]/li[1]/span/a"; 可用
                const xpath ="//*[text()='依玩家ID查詢']" //可用
                const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
                const link = result.singleNodeValue;
                return link ? link.textContent.trim() : null;
            });
        
            // 斷言輸贏報表存在
            assert.strictEqual(winLoseReportText, '依玩家ID2查詢');
    });
});

//這樣也可以用
// const onlinePlayerText = await page.evaluate(() => {
//   const element = document.evaluate("//*[text()='Online player']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
//   return element ? element.textContent.trim() : null;
// });
// assert.equal(onlinePlayerText, 'Online player22222', 'online player element text is incorrect');