//com+k+c 註解
//com+k+u 反註解
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

describe('檢查玩家id功能', () => {
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
            
                    // 等待子菜单展開
                    await new Promise(resolve => setTimeout(resolve, 1000)); // 等待1秒鐘，確保子菜單展開
             
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
});
describe('檢查單號查詢功能', () => {
    test('點擊單號查詢', async () => {
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

        // 等待子菜单展開
        await new Promise(resolve => setTimeout(resolve, 1000)); // 等待1秒鐘，確保子菜單展開
 
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
    test('輸入存在單號，檢查遊戲紀錄', async () => {

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

      await page.type('#userId', '28265');
      await page.click("#root > div > div > div > div > main > div > div:nth-child(1) > div > div > div > form > div > div > div > div > div > span > span > span.ant-input-group-addon > button > span");
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const Netwin = await page.$eval('#root > div > div > div > div > main > div > div:nth-child(2) > div > div > div > div > div:nth-child(7) > div:nth-child(2) > span', element => element.textContent.trim());
      expect(Netwin).toBeTruthy(); 
      assert.equal(Netwin, '$952.800', 'online player element text is incorrect');
      
        })
    test('輸入不存在單號，檢查錯誤提示', async () => {

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
        await page.click("#root > div > div > div > div > main > div > div:nth-child(1) > div > div > div > form > div > div > div > div > div > span > span > span.ant-input-affix-wrapper.ant-input-affix-wrapper-lg.css-1r287do.ant-input-outlined.ant-input-status-success > span > span");
        await page.type('#userId', '99999');
        await page.click("#root > div > div > div > div > main > div > div:nth-child(1) > div > div > div > form > div > div > div > div > div > span > span > span.ant-input-group-addon > button > span");
        await new Promise(resolve => setTimeout(resolve, 3000));
        const nodata = await page.$eval('#root > div > div > div > div > main > div > div:nth-child(2) > div > div > div > p', element => element.textContent.trim());
        expect(nodata).toBeTruthy(); 
        assert.equal(nodata, '暫無數據', 'online player element text is incorrect');
        })
    test('輸入不合格式單號，檢查錯誤提示', async () => {
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
        await page.click("#root > div > div > div > div > main > div > div:nth-child(1) > div > div > div > form > div > div > div > div > div > span > span > span.ant-input-affix-wrapper.ant-input-affix-wrapper-lg.css-1r287do.ant-input-outlined.ant-input-status-success > span > span");
        await page.type('#userId', '測試');
        await page.click("#root > div > div > div > div > main > div > div:nth-child(1) > div > div > div > form > div > div > div > div > div > span > span > span.ant-input-group-addon > button > span");
        await new Promise(resolve => setTimeout(resolve, 3000));
        const errormsg = await page.$eval('#userId_help > div', element => element.textContent.trim());
        expect(errormsg).toBeTruthy(); 
        assert.equal(errormsg, '此欄位只能輸入數字，不包含特殊符號或空格', 'online player element text is incorrect');
        })
    test('沒輸入單號，檢查錯誤提示', async () => {
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
        await page.click("#root > div > div > div > div > main > div > div:nth-child(1) > div > div > div > form > div > div.ant-row.ant-form-item-row.css-1r287do > div > div.ant-form-item-control-input > div > span > span > span.ant-input-affix-wrapper.ant-input-affix-wrapper-lg.css-1r287do.ant-input-outlined.ant-input-status-error > span > span > span > svg > path");
        await page.type('#userId', '');
        await page.click("#root > div > div > div > div > main > div > div:nth-child(1) > div > div > div > form > div > div > div > div > div > span > span > span.ant-input-group-addon > button > span");
        await new Promise(resolve => setTimeout(resolve, 3000));
        const noentermsg = await page.$eval('#userId_help > div', element => element.textContent.trim());
        expect(noentermsg).toBeTruthy(); 
        assert.equal(noentermsg, '此欄位為必填', 'noentermsg text is incorrect');
    });
});

