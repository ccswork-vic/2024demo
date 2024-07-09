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
    await page.type('#account', 'vicag');
    await page.type('#password', 'aaaa1234');
    await page.click("#root > div > div > div > div > form > div > div:nth-child(4) > button");
    await page.waitForSelector('#root > div > div > header > div._icon_iyfbn_38.ml-auto.flex.items-center.justify-center > div.ml-4.cursor-pointer.font-bold > button > span.ml-1', { timeout: 60000 });
});
afterAll(async () => {
    await browser.close();
});

describe('檢查會員清單', () => {
    test.only('點擊會員清單', async () => {
        const xpathForsearch = "//*[text()='會員管理']";

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

        const xpath = "//*[text()='會員清單']";
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
        const memberlist = await page.$eval('#root > div > div > div > div > main > div > div:nth-child(1) > div > div > h2', element => element.textContent.trim());
        expect(memberlist).toBeTruthy();
        assert.equal(memberlist, '會員清單', 'memberlist text is incorrect');
    })
    test.only('檢查麵包屑', async () => {
        const xpath = "//*[text()='會員清單']";
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
        assert.equal(Breadcrumbs, '總覽/會員管理/會員清單', 'Breadcrumbs text is incorrect');
        expect(Breadcrumbs).toContain('總覽');
        expect(Breadcrumbs).toContain('會員管理');
        expect(Breadcrumbs).toContain('會員清單');
    })
    test.only('檢查輸入框預設文字', async () => {
        const xpath = "//*[text()='會員清單']";
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
        assert.equal(placeholderText, '請輸入指定帳號', 'playidsearch text is incorrect');
    })
    test.only('輸入不存在玩家id，檢查錯誤提示', async () => {
        const xpath = "//*[text()='會員清單']";
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
        await page.click("#root > div > div > div > div > main > div > div:nth-child(1) > div > div > form > div > div:nth-child(2) > div > div > div > div > div > span");
        await page.type('#fullAccount', 'jon55661314444');
        await page.click("#root > div > div > div > div > main > div > div:nth-child(1) > div > div > form > div > div:nth-child(3) > div > div > div > div > div > button");
        await new Promise(resolve => setTimeout(resolve, 1000));
        const nouser = await page.$eval('body > div.ant-message.ant-message-top.css-1r287do > div > div > div > div > span:nth-child(2)', element => element.textContent.trim());
        expect(nouser).toBeTruthy();
        assert.equal(nouser, 'Invalid DownLine Attribution', 'nouser text is incorrect');
    })
    test.only('輸入存在玩家id，並檢查使用者幣別', async () => {
        const xpath = "//*[text()='會員清單']";
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

        await page.click("#root > div > div > div > div > main > div > div:nth-child(1) > div > div > form > div > div:nth-child(2) > div > div > div > div > div > span > span > span > span > svg > path");
        await page.click("#root > div > div > div > div > main > div > div:nth-child(1) > div > div > form > div > div:nth-child(2) > div > div > div > div > div > span");
        await page.type('#fullAccount', 'vic0701');
        await page.click("#root > div > div > div > div > main > div > div:nth-child(1) > div > div > form > div > div:nth-child(3) > div > div > div > div > div > button");
        await new Promise(resolve => setTimeout(resolve, 1000));

        const userdata = await page.$eval('#root > div > div > div > div > main > div > div:nth-child(2) > div > div:nth-child(2) > div > div > div.ant-table-wrapper.css-1r287do > div > div > div > div > div > table > tbody > tr.ant-table-row.ant-table-row-level-0 > td:nth-child(4) > span > span', element => element.textContent.trim());
        expect(userdata).toBeTruthy();
        assert.equal(userdata, 'RMB', 'userdata element text is incorrect');

    })
    test.only('輸入存在玩家id，鎖定/取消鎖定使用者', async () => {
        const xpath = "//*[text()='會員清單']";
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
        //清除之前帳號
        await page.click("#root > div > div > div > div > main > div > div:nth-child(1) > div > div > form > div > div:nth-child(2) > div > div > div > div > div > span > span > span > span > svg > path");
        //點輸入框
        await page.click("#root > div > div > div > div > main > div > div:nth-child(1) > div > div > form > div > div:nth-child(2) > div > div > div > div > div > span");
        //輸帳號
        await page.type('#fullAccount', 'vicgu03131');
        //點查詢
        await page.click("#root > div > div > div > div > main > div > div:nth-child(1) > div > div > form > div > div:nth-child(3) > div > div > div > div > div > button");
        await new Promise(resolve => setTimeout(resolve, 3000));
        //點操作
        await page.click("#root > div > div > div > div > main > div > div:nth-child(2) > div > div:nth-child(2) > div > div > div.ant-table-wrapper.css-1r287do > div > div > div > div > div > table > tbody > tr.ant-table-row.ant-table-row-level-0 > td.ant-table-cell.ant-table-cell-fix-right.ant-table-cell-fix-right-first > button");
        await new Promise(resolve => setTimeout(resolve, 2000));
        const xpathForLock = "//*[text()='鎖 定']";
        const xpathForUnlock = "//*[text()='取消鎖定']";
        // 等待其中一个按钮出现
        await Promise.any([
            page.waitForFunction((xpath) => {
                const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
                return result.singleNodeValue !== null;
            }, { timeout: 60000 }, xpathForLock),
            page.waitForFunction((xpath) => {
                const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
                return result.singleNodeValue !== null;
            }, { timeout: 60000 }, xpathForUnlock)
        ]);
        await new Promise(resolve => setTimeout(resolve, 2000));
        // 尝试点击锁定按钮
        try {
            await page.evaluate((xpath) => {
                const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                if (element) {
                    element.click();
                }
            }, xpathForLock);
        } catch (error) {
            console.log("Lock button not found, trying unlock button...");
        }

        // 尝试点击取消锁定按钮
        try {
            await page.evaluate((xpath) => {
                const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                if (element) {
                    element.click();
                }
            }, xpathForUnlock);
        } catch (error) {
            console.log("Unlock button not found.");
        }
        //await page.waitForSelector('.ant-message-notice-success');

        await new Promise(resolve => setTimeout(resolve, 2000));
        // 等待成功消息消失
        //await page.waitForSelector('.ant-message-notice-success', { hidden: true });

        // 尝试点击页面上的其他元素以重置焦点（根据页面实际情况调整选择器）
        //await page.click('body');
        //await page.keyboard.press('Tab');

        const updatedone = await page.$eval('body > div.ant-message.ant-message-top.css-1r287do > div > div > div > div > span:nth-child(2)', element => element.textContent.trim());
        expect(updatedone).toBeTruthy();
        assert.equal(updatedone, '更新下線狀態成功', 'userdata element text is incorrect');

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
    test.only('下拉清單過濾限制的使用者，檢查數據正確', async () => {
        const xpath = "//*[text()='會員清單']";
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
        await page.click("#root > div > div > div > div > main > div > div:nth-child(1) > div > div > form > div > div:nth-child(1) > div > div > div > div > div > button > div > span > svg");
        await new Promise(resolve => setTimeout(resolve, 2000));
        const xpathFor00 = "//ul[contains(@class, 'ant-dropdown-menu')]//li[@role='menuitem' and .//span[text()='限制']]";
        await page.waitForFunction((xpath) => {
            const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
            return result.singleNodeValue !== null;
        }, { timeout: 60000 }, xpathFor00);
        await new Promise(resolve => setTimeout(resolve, 2000));
        await page.evaluate((xpath) => {
            const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            if (element) {
                element.click();
            } else {
                throw new Error(`Element with XPath ${xpath} not found.`);
            }
        }, xpathFor00);
        await new Promise(resolve => setTimeout(resolve, 2000));
        //清除之前帳號
        await page.click("#root > div > div > div > div > main > div > div:nth-child(1) > div > div > form > div > div:nth-child(2) > div > div > div > div > div > span > span > span > span > svg > path");
        //點查詢
        await page.click("#root > div > div > div > div > main > div > div:nth-child(1) > div > div > form > div > div:nth-child(3) > div > div > div > div > div > button");
        await new Promise(resolve => setTimeout(resolve, 5000));
        const rows = await page.$$('#root > div > div > div > div > main > div > div:nth-child(2) > div > div:nth-child(2) > div > div > div.ant-table-wrapper.css-1r287do > div > div > div > div > div >table > tbody > tr');
        expect(rows.length).toBe(6);
        const userNames = [
            'vic032522',
            'vic032523',
            'vic0410',
            'vicgu03082',
            'vic0701',//故意寫錯一個
            // 添加其他使用者名称
        ];
        
        for (let i = 2; i <= 6; i++) {
            const selector = `#root > div > div > div > div > main > div > div:nth-child(2) > div > div:nth-child(2) > div > div > div.ant-table-wrapper.css-1r287do > div > div > div > div > div > table > tbody > tr:nth-child(${i}) > td:nth-child(2)`;
        
            const userSerial = await page.$eval(selector, cell => cell.textContent.trim());
        
            expect(userNames).toContain(userSerial);
        }

    })
});
