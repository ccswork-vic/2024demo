//com+k+c 註解
//com+k+u 反註解
//排版文件：Shift + Option + F
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

describe('檢查玩家id查詢功能', () => {
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
        const playidsearch = await page.$eval('#root > div > div > div > div > main > div > div:nth-child(1) > div > div > h2', element => element.textContent.trim());
        expect(playidsearch).toBeTruthy();
        assert.equal(playidsearch, '依玩家ID查詢', 'playidsearch text is incorrect');
    })
    test('檢查麵包屑', async () => {
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
        const Breadcrumbs = await page.$eval('#root > div > div > div > div > nav > ol', element => element.textContent.trim());
        expect(Breadcrumbs).toBeTruthy();
        assert.equal(Breadcrumbs, '總覽/快速搜尋/依玩家ID查詢', 'Breadcrumbs text is incorrect');
        expect(Breadcrumbs).toContain('總覽');
        expect(Breadcrumbs).toContain('快速搜尋');
        expect(Breadcrumbs).toContain('依玩家ID查詢');
    })
    test('檢查輸入框預設文字', async () => {
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
        const placeholderText = await page.$eval('input.ant-input.ant-input-lg.css-1r287do', element => element.getAttribute('placeholder'));
        expect(placeholderText).toBeTruthy();
        assert.equal(placeholderText, '請輸入玩家ID', 'playidsearch text is incorrect');
    })
    test('輸入不存在玩家id，檢查錯誤提示', async () => {
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
        await page.click("#root > div > div > div > div > main > div > div:nth-child(1) > div > div > div > form > div > div > div > div > div > span > span > span.ant-input-affix-wrapper.ant-input-affix-wrapper-lg.css-1r287do.ant-input-outlined.ant-input-status-success > span > span");
        await page.type('#userId', 'jon5566');
        await page.click("#root > div > div > div > div > main > div > div:nth-child(1) > div > div > div > form > div > div > div > div > div > span > span > span.ant-input-group-addon > button > span");
        await new Promise(resolve => setTimeout(resolve, 3000));
        const nouser = await page.$eval('body > div.ant-message.ant-message-top.css-1r287do > div > div > div > div > span:nth-child(2)', element => element.textContent.trim());
        expect(nouser).toBeTruthy();
        assert.equal(nouser, '下線不存在', 'nouser text is incorrect');
    })
    test('輸入存在玩家id，滾動畫面並檢查使用者名稱', async () => {
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
        await page.click("#root > div > div > div > div > main > div > div:nth-child(1) > div > div > div > form > div > div > div > div > div > span > span > span.ant-input-affix-wrapper.ant-input-affix-wrapper-lg.css-1r287do.ant-input-outlined.ant-input-status-success > span > span > span > svg");
        await page.type('#userId', 'vic0522');
        await page.click("#root > div > div > div > div > main > div > div:nth-child(1) > div > div > div > form > div > div > div > div > div > span > span > span.ant-input-group-addon > button > span");
        await new Promise(resolve => setTimeout(resolve, 3000));

        // const scrollHeight = await page.evaluate(() => document.body.scrollHeight);
        // const viewportHeight = await page.evaluate(() => window.innerHeight);

        // let scrollPosition = 0;
        // const scrollStep = 250; // 每次滚动的距离

        // // 循环滚动直到页面底部
        // while (scrollPosition < scrollHeight) {
        //     await page.evaluate((scrollStep) => {
        //         window.scrollBy(0, scrollStep); // 向下滚动指定距离
        //     }, scrollStep);

        //     scrollPosition += scrollStep;
        //     await new Promise(resolve => setTimeout(resolve, 3000));; // 等待页面加载和渲染
        // }

        // 等待一段时间，确保滚动完成
        //await new Promise(resolve => setTimeout(resolve, 3000));;
     
        //滾動往下特定元素今日輸贏統計
        const element1 = await page.$('#root > div > div > div > div > main > div > div:nth-child(2) > div > div > div > div > div:nth-child(4) > h3');
        await element1.scrollIntoView();
        await new Promise(resolve => setTimeout(resolve, 3000));;
        //滾動往上特定元素會員資料
        const element2 = await page.$('#root > div > div > div > div > main > div > div:nth-child(2) > div > div > div > div > div:nth-child(1) > div > h3');
        await element2.scrollIntoView();
        await new Promise(resolve => setTimeout(resolve, 3000));;
        //滾動往上特定元素會員資料
        const element3 = await page.$('#root > div > div > div > div > main > div > div:nth-child(2) > div > div > div > div > div:nth-child(3) > div > canvas');
        await element3.scrollIntoView();
        await new Promise(resolve => setTimeout(resolve, 3000));;


        const userdata = await page.$eval('#root > div > div > div > div > main > div > div:nth-child(2) > div > div > div > div > div:nth-child(1) > div > div > div:nth-child(2) > span', element => element.textContent.trim());
        expect(userdata).toBeTruthy();
        assert.equal(userdata, 'vic0522(RMB)', 'online player element text is incorrect');

    })
    test('切換語系，檢查錯誤提示', async () => {
        const xpathForchangelanguage = '//*[@data-trigger-id="dropdown-language-i"]';

        // 等待元素出现
        await page.waitForFunction((xpath) => {
            const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
            return result.singleNodeValue !== null;
        }, { timeout: 60000 }, xpathForchangelanguage);
  
  
   // 获取 CSS 选择器
   const cssSelector = await page.evaluate((xpath) => {
      const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
      return element ? `[data-trigger-id="${element.getAttribute('data-trigger-id')}"]` : null;
    }, xpathForchangelanguage);
  
    if (cssSelector) {
        // 鼠标悬停在元素上
        await page.hover(cssSelector);
  
        // 等待弹出窗口完全显示
        await page.waitForSelector('.ant-dropdown-menu', { visible: true });
  
        // 等待一段时间以确保弹出窗口完全显示
        await new Promise(resolve => setTimeout(resolve, 4000)); // 你可以调整这个等待时间
  
        // 检查弹窗是否存在
        const isVisible = await page.evaluate(() => {
          const menu = document.querySelector('.ant-dropdown-menu');
          return menu && window.getComputedStyle(menu).display !== 'none' && menu.offsetWidth > 0 && menu.offsetHeight > 0;
      });
      if (!isVisible) {
          throw new Error('Dropdown menu is not visible.');
      }
  
        // 点击弹出菜单中的 '简体中文' 选项
        const xpathForEN = "//*[text()='English']";
        await page.waitForFunction((xpath) => {
            const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
            return result.singleNodeValue !== null;
        }, { timeout: 60000 }, xpathForEN);
  
        await page.evaluate((xpath) => {
            const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            if (element) {
                element.click();
            } else {
                throw new Error(`Element with XPath ${xpath} not found.`);
            }
        }, xpathForEN);
  
    } else {
        throw new Error(`Failed to get CSS selector for element with XPath ${xpathForchangelanguage}.`);
    }
    await new Promise(resolve => setTimeout(resolve, 5000)); // 等待1秒鐘，確保子菜單展開
        const xpath = "//*[text()='By Player ID']";
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
        await page.click("#root > div > div > div > div > main > div > div:nth-child(1) > div > div > div > form > div > div > div > div > div > span > span > span.ant-input-affix-wrapper.ant-input-affix-wrapper-lg.css-1r287do.ant-input-outlined.ant-input-status-success > span > span > span > svg");
        await page.type('#userId', 'vic032522');
        await page.click("#root > div > div > div > div > main > div > div:nth-child(1) > div > div > div > form > div > div > div > div > div > span > span > span.ant-input-group-addon > button > span");
        await new Promise(resolve => setTimeout(resolve, 3000));
        const userdata = await page.$eval('#root > div > div > div > div > main > div > div:nth-child(2) > div > div > div > div > div:nth-child(1) > div > div > div:nth-child(2) > span', element => element.textContent.trim());
        expect(userdata).toBeTruthy();
        assert.equal(userdata, 'vic032522(RMB)', 'online player element text is incorrect');

        const xpathForchangelanguageback = '//*[@data-trigger-id="dropdown-language-i"]';

        // 等待元素出现
        await page.waitForFunction((xpath) => {
            const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
            return result.singleNodeValue !== null;
        }, { timeout: 60000 }, xpathForchangelanguageback);
  
  
   // 获取 CSS 选择器
   const cssSelectortozh = await page.evaluate((xpath) => {
      const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
      return element ? `[data-trigger-id="${element.getAttribute('data-trigger-id')}"]` : null;
    }, xpathForchangelanguageback);
  
    if (cssSelectortozh) {
        // 鼠标悬停在元素上
        await page.hover(cssSelectortozh);
  
        // 等待弹出窗口完全显示
        await page.waitForSelector('.ant-dropdown-menu', { visible: true });
  
        // 等待一段时间以确保弹出窗口完全显示
        await new Promise(resolve => setTimeout(resolve, 4000)); // 你可以调整这个等待时间
  
        // 检查弹窗是否存在
        const isVisible = await page.evaluate(() => {
          const menu = document.querySelector('.ant-dropdown-menu');
          return menu && window.getComputedStyle(menu).display !== 'none' && menu.offsetWidth > 0 && menu.offsetHeight > 0;
      });
      if (!isVisible) {
          throw new Error('Dropdown menu is not visible.');
      }
  
        // 点击弹出菜单中的 '中文' 选项
        const xpathForCN = "//*[text()='繁體中文']";
        await page.waitForFunction((xpath) => {
            const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
            return result.singleNodeValue !== null;
        }, { timeout: 60000 }, xpathForCN);
  
        await page.evaluate((xpath) => {
            const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            if (element) {
                element.click();
            } else {
                throw new Error(`Element with XPath ${xpath} not found.`);
            }
        }, xpathForCN);
  
    } else {
        throw new Error(`Failed to get CSS selector for element with XPath ${xpathForchangelanguageback}.`);
    }
    await new Promise(resolve => setTimeout(resolve, 5000)); // 等待1秒鐘，確保子菜單展開
    })
    test('不輸入玩家id，檢查錯誤提示', async () => {
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
        await page.click("#root > div > div > div > div > main > div > div:nth-child(1) > div > div > div > form > div > div > div > div > div > span > span > span.ant-input-affix-wrapper.ant-input-affix-wrapper-lg.css-1r287do.ant-input-outlined.ant-input-status-success > span > span > span > svg");
        await page.click("#root > div > div > div > div > main > div > div:nth-child(1) > div > div > div > form > div > div > div > div > div > span > span > span.ant-input-group-addon > button > span");
        await new Promise(resolve => setTimeout(resolve, 3000));
        const noinputuserdata = await page.$eval('#userId_help > div', element => element.textContent.trim());
        expect(noinputuserdata).toBeTruthy();
        assert.equal(noinputuserdata, '請輸入玩家ID', 'online player element text is incorrect');

    })
});
describe('檢查單號查詢功能', () => {
    test('點擊單號查詢', async () => {
        //   //const xpathForsearch = "//*[text()='快速搜尋']";

        //   // 等待元素出现
        //   await page.waitForFunction((xpath) => {
        //       const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
        //       return result.singleNodeValue !== null;
        //   }, { timeout: 60000 }, xpathForsearch);

        //   // 点击元素
        //   await page.evaluate((xpath) => {
        //       const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
        //       const element = result.singleNodeValue;
        //       if (element) {
        //           element.click();
        //       } else {
        //           throw new Error(`Element with XPath ${xpath} not found.`);
        //       }
        //   }, xpathForsearch);

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
        const seqidsearch = await page.$eval('#root > div > div > div > div > main > div > div:nth-child(1) > div > div > h2', element => element.textContent.trim());
        expect(seqidsearch).toBeTruthy();
        assert.equal(seqidsearch, '依單號查詢', 'playidsearch text is incorrect');
    })
    test('檢查麵包屑', async () => {
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
        const Breadcrumbs = await page.$eval('#root > div > div > div > div > nav > ol', element => element.textContent.trim());
        expect(Breadcrumbs).toBeTruthy();
        assert.equal(Breadcrumbs, '總覽/快速搜尋/依單號查詢', 'playidsearch text is incorrect');
        expect(Breadcrumbs).toContain('總覽');
        expect(Breadcrumbs).toContain('快速搜尋');
        expect(Breadcrumbs).toContain('依單號查詢');
    })
    test('檢查輸入框預設文字', async () => {
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
        const seqplaceholderText = await page.$eval('input.ant-input.ant-input-lg.css-1r287do', element => element.getAttribute('placeholder'));
        expect(seqplaceholderText).toBeTruthy();
        expect(seqplaceholderText).toBe('請輸入遊戲序');
        //assert.equal(seqplaceholderText, '請輸入遊戲序號', 'seqplaceholderText text is incorrect');
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
    test('切換語系，檢查錯誤提示', async () => {
        const xpathForchangelanguage = '//*[@data-trigger-id="dropdown-language-i"]';

        // 等待元素出现
        await page.waitForFunction((xpath) => {
            const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
            return result.singleNodeValue !== null;
        }, { timeout: 60000 }, xpathForchangelanguage);
  
  
   // 获取 CSS 选择器
   const cssSelector = await page.evaluate((xpath) => {
      const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
      return element ? `[data-trigger-id="${element.getAttribute('data-trigger-id')}"]` : null;
    }, xpathForchangelanguage);
  
    if (cssSelector) {
        // 鼠标悬停在元素上
        await page.hover(cssSelector);
  
        // 等待弹出窗口完全显示
        await page.waitForSelector('.ant-dropdown-menu', { visible: true });
  
        // 等待一段时间以确保弹出窗口完全显示
        await new Promise(resolve => setTimeout(resolve, 4000)); // 你可以调整这个等待时间
  
        // 检查弹窗是否存在
        const isVisible = await page.evaluate(() => {
          const menu = document.querySelector('.ant-dropdown-menu');
          return menu && window.getComputedStyle(menu).display !== 'none' && menu.offsetWidth > 0 && menu.offsetHeight > 0;
      });
      if (!isVisible) {
          throw new Error('Dropdown menu is not visible.');
      }
  
        // 点击弹出菜单中的 '简体中文' 选项
        const xpathForCN = "//*[text()='English']";
        await page.waitForFunction((xpath) => {
            const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
            return result.singleNodeValue !== null;
        }, { timeout: 60000 }, xpathForCN);
  
        await page.evaluate((xpath) => {
            const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            if (element) {
                element.click();
            } else {
                throw new Error(`Element with XPath ${xpath} not found.`);
            }
        }, xpathForCN);
  
    } else {
        throw new Error(`Failed to get CSS selector for element with XPath ${xpathForchangelanguage}.`);
    }
    await new Promise(resolve => setTimeout(resolve, 5000)); // 等待1秒鐘，確保子菜單展開
        const xpath = "//*[text()='By Sequence ID']";
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
        assert.equal(noentermsg, 'Column is required.', 'noentermsg text is incorrect');
    });
});

