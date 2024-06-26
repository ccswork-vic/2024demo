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
        headless: false, // 如果 true  就不開啟瀏覽器測試，直接跑完
        defaultViewport: null // 關閉默認小視窗
    });
    page = await browser.pages().then(pages => pages[0]);
    //page = await browser.newPage();
    await page.goto('https://test-agent.zestplay.co/login', { waitUntil: "domcontentloaded" });
    await page.waitForSelector('#root > div > div > div > div > form > div > div:nth-child(4) > button', { timeout: 60000 });

    // 登入
    await page.type('#account', 'vicma');
    await page.type('#password', 'aaaa1234');
    await page.click("#root > div > div > div > div > form > div > div:nth-child(4) > button");
    await page.waitForSelector('#root > div > div > header > div._icon_iyfbn_38.ml-auto.flex.items-center.justify-center > div.ml-4.cursor-pointer.font-bold > button > span.ml-1', { timeout: 60000 });
});
afterAll(async () => {
    await browser.close();
});

describe('檢查玩家id查詢功能', () => {
    test.only('點擊遊戲設定', async () => {
        const xpathForsearch = "//*[text()='遊戲設定']";

        // 等待元素出現
        await page.waitForFunction((xpath) => {
            const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
            return result.singleNodeValue !== null;
        }, { timeout: 60000 }, xpathForsearch);

        // 點元素
        await page.evaluate((xpath) => {
            const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
            const element = result.singleNodeValue;
            if (element) {
                element.click();
            } else {
                throw new Error(`Element with XPath ${xpath} not found.`);
            }
        }, xpathForsearch);

        // 等待submenu打開
        await new Promise(resolve => setTimeout(resolve, 1000)); // 等待1秒鐘，等待submenu打開

        const xpath = "//*[text()='遊戲列表']";
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
        const gamelist = await page.$eval('#root > div > div > div > div > main > div > div:nth-child(1) > div > div > h2', element => element.textContent.trim());
        expect(gamelist).toBeTruthy();
        assert.equal(gamelist, '遊戲列表', 'text is incorrect');
    })
    test.only('檢查麵包屑', async () => {
        const xpath = "//*[text()='遊戲列表']";
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
        assert.equal(Breadcrumbs, '總覽/遊戲設定/遊戲列表', 'text is incorrect');
        expect(Breadcrumbs).toContain('總覽');
        expect(Breadcrumbs).toContain('遊戲設定');
        expect(Breadcrumbs).toContain('遊戲列表');
    })
    test.only('檢查輸入框預設文字', async () => {
        const xpath = "//*[text()='遊戲列表']";
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
        assert.equal(placeholderText, '請輸入遊戲名稱 (選填)', 'text is incorrect');
    })
    test.only('檢查按鈕-全選', async () => {
        const xpath = "//*[text()='遊戲列表']";
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
        //await page.click("#root > div > div > div > div > main > div > div:nth-child(1) > div > div > div > form > div > div > div > div > div > span > span > span.ant-input-affix-wrapper.ant-input-affix-wrapper-lg.css-1r287do.ant-input-outlined.ant-input-status-success > span > span");
        //await page.type('#userId', 'jon5566');
        //await page.click("#root > div > div > div > div > main > div > div:nth-child(1) > div > div > div > form > div > div > div > div > div > span > span > span.ant-input-group-addon > button > span");
        //await new Promise(resolve => setTimeout(resolve, 1000));
        const btn1 = await page.$eval('#root > div > div > div > div > main > div > div:nth-child(1) > div > div > form > div > div:nth-child(2) > button', element => element.textContent.trim());
        expect(btn1).toBeTruthy();
        assert.equal(btn1, '全 選', 'text is incorrect');
    })
    test.only('檢查按鈕-全部清除', async () => {
        const xpath = "//*[text()='遊戲列表']";
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
        await page.click("#root > div > div > div > div > main > div > div:nth-child(1) > div > div > form > div > div:nth-child(2) > button");
        const btn2 = await page.$eval('#root > div > div > div > div > main > div > div:nth-child(1) > div > div > form > div > div:nth-child(2) > button', element => element.textContent.trim());
        expect(btn2).toBeTruthy();
        assert.equal(btn2, '全部清除', 'text is incorrect');
    })
    test.only('檢查按鈕-查詢', async () => {
        const xpath = "//*[text()='遊戲列表']";
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
        const btn3 = await page.$eval('#root > div > div > div > div > main > div > div:nth-child(1) > div > div > form > div > div.ant-col.ant-col-4.css-1r287do > div > div > div > div > div > button > span', element => element.textContent.trim());
        expect(btn3).toBeTruthy();
        assert.equal(btn3, '查 詢', 'text is incorrect');
    })
    test.only('檢查按鈕-押注設定', async () => {
        const xpath = "//*[text()='遊戲列表']";
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
        const btn4 = await page.$eval('#root > div > div > div > div > main > div > div:nth-child(2) > div > div > div > div > div > div > div > div > div > div > table > tbody > tr.ant-table-row.ant-table-row-level-0 > td.ant-table-cell.ant-table-cell-fix-right.ant-table-cell-fix-right-first > div > div:nth-child(1) > button > span', element => element.textContent.trim());
        expect(btn4).toBeTruthy();
        assert.equal(btn4, '押注設定', 'text is incorrect');
    })
    test.only('檢查按鈕-Payment 設定', async () => {
        const xpath = "//*[text()='遊戲列表']";
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
        const btn5 = await page.$eval('#root > div > div > div > div > main > div > div:nth-child(2) > div > div > div > div > div > div > div > div > div > div > table > tbody > tr.ant-table-row.ant-table-row-level-0 > td.ant-table-cell.ant-table-cell-fix-right.ant-table-cell-fix-right-first > div > div:nth-child(2) > button > span', element => element.textContent.trim());
        expect(btn5).toBeTruthy();
        assert.equal(btn5, 'Payment 設定', 'text is incorrect');
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
        await new Promise(resolve => setTimeout(resolve, 1000));

        //滾動往下特定元素今日輸贏統計
        const element1 = await page.$('#root > div > div > div > div > main > div > div:nth-child(2) > div > div > div > div > div:nth-child(4) > h3');
        await element1.scrollIntoView();
        await new Promise(resolve => setTimeout(resolve, 1000));;
        //滾動往上特定元素會員資料
        const element2 = await page.$('#root > div > div > div > div > main > div > div:nth-child(2) > div > div > div > div > div:nth-child(1) > div > h3');
        await element2.scrollIntoView();
        await new Promise(resolve => setTimeout(resolve, 1000));;
        //滾動往上特定元素會員資料
        const element3 = await page.$('#root > div > div > div > div > main > div > div:nth-child(2) > div > div > div > div > div:nth-child(3) > div > canvas');
        await element3.scrollIntoView();
        await new Promise(resolve => setTimeout(resolve, 1000));;


        const userdata = await page.$eval('#root > div > div > div > div > main > div > div:nth-child(2) > div > div > div > div > div:nth-child(1) > div > div > div:nth-child(2) > span', element => element.textContent.trim());
        expect(userdata).toBeTruthy();
        assert.equal(userdata, 'vic0522(RMB)', 'userdata element text is incorrect');

    })
    test('切換成英文，檢查使用者名稱，在切換回中文', async () => {
        const xpathForchangelanguage = '//*[@data-trigger-id="dropdown-language-i"]';

        // 等待元素出现
        await page.waitForFunction((xpath) => {
            const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
            return result.singleNodeValue !== null;
        }, { timeout: 60000 }, xpathForchangelanguage);


        // 取CSS 選擇棄
        const cssSelector = await page.evaluate((xpath) => {
            const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            return element ? `[data-trigger-id="${element.getAttribute('data-trigger-id')}"]` : null;
        }, xpathForchangelanguage);

        if (cssSelector) {
            // 滑鼠懸浮停在元素上
            await page.hover(cssSelector);

            // 等待彈窗
            await page.waitForSelector('.ant-dropdown-menu', { visible: true });

            // 等待彈窗並加上時間讓他完全顯示
            await new Promise(resolve => setTimeout(resolve, 4000)); 

            // 檢查彈窗是否存在
            const isVisible = await page.evaluate(() => {
                const menu = document.querySelector('.ant-dropdown-menu');
                return menu && window.getComputedStyle(menu).display !== 'none' && menu.offsetWidth > 0 && menu.offsetHeight > 0;
            });
            if (!isVisible) {
                throw new Error('Dropdown menu is not visible.');
            }

            // 點擊彈窗中english的選項
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
        await new Promise(resolve => setTimeout(resolve, 1000)); // 等待1秒鐘，確保submenu打開
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
        await new Promise(resolve => setTimeout(resolve, 1000));
        const eninfo = await page.$eval('#root > div > div > div > div > main > div > div:nth-child(2) > div > div > div > div > div:nth-child(1) > div > div > div:nth-child(1) > small', element => element.textContent.trim());
        expect(eninfo).toBeTruthy();
        assert.equal(eninfo, 'Online Info', 'onlineinfo element text is incorrect');

        //準備切換回另一個語系
        const xpathForchangelanguageback = '//*[@data-trigger-id="dropdown-language-i"]';

        // 等待元素出现
        await page.waitForFunction((xpath) => {
            const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
            return result.singleNodeValue !== null;
        }, { timeout: 60000 }, xpathForchangelanguageback);


        // 取 CSS 選擇器
        const cssSelectortozh = await page.evaluate((xpath) => {
            const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            return element ? `[data-trigger-id="${element.getAttribute('data-trigger-id')}"]` : null;
        }, xpathForchangelanguageback);

        if (cssSelectortozh) {
            // 滑鼠懸停在元素上
            await page.hover(cssSelectortozh);

            // 等待彈窗
            await page.waitForSelector('.ant-dropdown-menu', { visible: true });

            // 等一段時間確保彈窗顯示
            await new Promise(resolve => setTimeout(resolve, 4000)); 

            // 檢查彈窗是否存在
            const isVisible = await page.evaluate(() => {
                const menu = document.querySelector('.ant-dropdown-menu');
                return menu && window.getComputedStyle(menu).display !== 'none' && menu.offsetWidth > 0 && menu.offsetHeight > 0;
            });
            if (!isVisible) {
                throw new Error('Dropdown menu is not visible.');
            }

            // 點彈窗中繁體中文選項
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
        await new Promise(resolve => setTimeout(resolve, 1000)); // 等待1秒鐘，確保submenu打開
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
        await new Promise(resolve => setTimeout(resolve, 1000));
        const noinputuserdata = await page.$eval('#userId_help > div', element => element.textContent.trim());
        expect(noinputuserdata).toBeTruthy();
        assert.equal(noinputuserdata, '請輸入玩家ID', 'online player element text is incorrect');

    })
});