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
    await page.type('#account', 'admin');
    await page.type('#password', 'aaaa1234');
    await page.click("#root > div > div > div > div > form > div > div:nth-child(4) > button");
    await page.waitForSelector('#root > div > div > header > div._icon_iyfbn_38.ml-auto.flex.items-center.justify-center > div.ml-4.cursor-pointer.font-bold > button > span.ml-1', { timeout: 60000 });
});
afterAll(async () => {
    await browser.close();
});

describe('dashboard 數字檢查', () => {
    test('檢查負數顏色(紅色)', async () => {
        const selector = '#root > div > div > div > div > main > div.ant-row.ant-row-center.css-1r287do > div:nth-child(2) > div > div > div > h2.text-3xl.my-0 > span';
        
        await page.waitForSelector('#root > div > div > div > div > main > div.ant-row.ant-row-center.css-1r287do > div:nth-child(2) > div > div > div > h2.text-3xl.my-0 > span', { timeout: 60000 });
        await new Promise(resolve => setTimeout(resolve, 5000));
        // 獲取元素的顏色屬性
        const color = await page.evaluate((selector) => {

            const element = document.querySelector(selector);
            return window.getComputedStyle(element).color;
        }, selector);

        console.log(color); // 輸出顏色屬性值，例如 "rgb(230, 29, 88)"

        //await new Promise(resolve => setTimeout(resolve, 5000));

        // 驗證顏色是否為預期值
        expect(color).toBe('rgb(230, 29, 88)'); // 使用 Jest 斷言來檢查顏色
    });
    test('檢查正數顏色色碼版本（藍色）', async () => {
        const selector = '#root > div > div > div > div > main > div.ant-row.ant-row-center.css-1r287do > div:nth-child(1) > div > div > div > h2.text-3xl.my-0 > span';
        
        await page.waitForSelector(selector);
        await new Promise(resolve => setTimeout(resolve, 5000));
        // 獲取元素的顏色屬性
        const color = await page.evaluate((selector) => {
            const element = document.querySelector(selector);
            return window.getComputedStyle(element).color;
        }, selector);

        console.log(color); // 輸出顏色屬性值，例如 "rgb(230, 29, 88)"

        // 將十六進制顏色轉換為 RGB 格式
        function hexToRgb(hex) {
            hex = hex.replace(/^#/, '');
            let bigint = parseInt(hex, 16);
            let r = (bigint >> 16) & 255;
            let g = (bigint >> 8) & 255;
            let b = bigint & 255;
            return `rgb(${r}, ${g}, ${b})`;
        }

        const expectedColor = hexToRgb('#409eff');
        
        // 驗證顏色是否為預期值
        expect(color).toBe(expectedColor); // 使用 Jest 斷言來檢查顏色
    });
    test('檢查黑色數字顏色', async () => {
        const selector = '#root > div > div > div > div > main > div.ant-row.ant-row-center.css-1r287do > div:nth-child(3) > div > div > div > h2.text-3xl.my-0 > span';
        
        await page.waitForSelector('#root > div > div > div > div > main > div.ant-row.ant-row-center.css-1r287do > div:nth-child(3) > div > div > div > h2.text-3xl.my-0 > span', { timeout: 60000 });
        await new Promise(resolve => setTimeout(resolve, 3000));
        // 獲取元素的顏色屬性
        const color = await page.evaluate((selector) => {
            const element = document.querySelector(selector);
            return window.getComputedStyle(element).color;
        }, selector);

        console.log(color); // 輸出顏色屬性值，例如 "rgba(0, 0, 0, 0.88)"

        const expectedColor = 'rgba(0, 0, 0, 0.88)';
        
        // 驗證顏色是否為預期值
        expect(color).toBe(expectedColor); // 使用 Jest 斷言來檢查顏色
    });
    test('檢查數字顏色（紅色或藍色）', async () => {
        const selector = '#root > div > div > div > div > main > div.ant-row.ant-row-center.css-1r287do > div:nth-child(2) > div > div > div > h2.text-3xl.my-0 > span';
        
        await page.waitForSelector(selector, { timeout: 60000 });
        await new Promise(resolve => setTimeout(resolve, 5000));
        
        // 獲取元素的顏色屬性
        const color = await page.evaluate((selector) => {
            const element = document.querySelector(selector);
            return window.getComputedStyle(element).color;
        }, selector);

        console.log(color); // 輸出顏色屬性值，例如 "rgb(230, 29, 88)"

        // 驗證顏色是否為預期值
        const expectedColors = ['rgb(230, 29, 88)', 'rgb(64, 158, 255)'];
        expect(expectedColors).toContain(color); // 使用 Jest 斷言來檢查顏色是否在預期值中
    });
});

