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
  await page.type('#validateOnly_account', '0966123123');
  await page.type('#validateOnly_password', 'aaaa1234');
  await page.click("#validateOnly > div.ant-form-item.mb-0.css-1dwc1ye > div > div > div > div > button");
  await page.waitForSelector('#validateOnly > div.ant-form-item.mb-0.css-1dwc1ye > div > div > div > div > button', { timeout: 60000 });
});

afterAll(async () => {
  await browser.close();
});

describe('確認登入成功', () => {
  test('檢查登入成功彈窗', async () => {
    await page.waitForSelector('div > div > div > div > div.ant-notification-notice-description', { timeout: 60000 });
    const WelcomeText = await page.$eval('div > div > div > div > div.ant-notification-notice-description', element => element.textContent.trim());
    assert.equal(WelcomeText, 'ยินดีต้อนรับ 660966123123', 'Admin setting element text is incorrect');
  });
  test('檢查註冊送活動彈窗', async () => {
    const xpath = "//*[text()='เข้าร่วม']";
    await new Promise(resolve => setTimeout(resolve, 1000));
    await page.evaluate((xpath) => {
        const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (element) {
            element.click();
        } else {
            throw new Error(`Element with XPath ${xpath} not found.`);
        }
    }, xpath);
    expect(xpath).toBeTruthy(); // 检查按钮是否存在
    //assert.equal(PopupbtnText, 'เข้าร่วม', 'Member management element text is incorrect');
  });
  test('檢查活動錢包', async () => {
    const xpath = "//*[text()='กระเป๋าเควส']";
    await new Promise(resolve => setTimeout(resolve, 1000));
    await page.evaluate((xpath) => {
        const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (element) {
            element.click();
        } else {
            throw new Error(`Element with XPath ${xpath} not found.`);
        }
    }, xpath);
    expect(xpath).toBeTruthy(); // 检查按钮是否存在
  });
  test.skip('檢查admin 左邊選單存在金融中心', async () => {
    const financialCenterText = await page.$eval('#root > div > div > aside > div > ul > li:nth-child(4) > div > span', element => element.textContent.trim());
    assert.equal(financialCenterText, 'ศูนย์การเงิน', 'report Text element text is incorrect');
  });
});

describe.skip('檢查報表-儀表板內容顯示', () => {
  test('點擊儀表板', async () => {
    const xpathForsearch = "//*[text()='รายงาน']";

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
      //直接點擊
  const xpath = "//*[text()='แดชบอร์ดการเงิน']";
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
  test('檢查流水/淨輸贏', async () => {
    const TurnoverText = await page.$eval('#root > div > div > div > main > article > div.ant-row.css-kghr11 > div:nth-child(1) > div > div > h3', element => element.textContent.trim());
    assert.equal(TurnoverText, 'ยอดเทิร์นโอเวอร์/กำไร (ขาดทุน) สุทธิ', 'Statement Text element text is incorrect');
  });
  test('檢查存款/提款', async () => {
    const DepositText = await page.$eval('#root > div > div > div > main > article > div.ant-row.css-kghr11 > div:nth-child(2) > div > div > h3', element => element.textContent.trim());
    assert.equal(DepositText, 'ฝากเงิน/ถอนเงิน', 'Statement Text element text is incorrect');
  });
  test('檢查本日註冊人數/新戶存款金額/新戶存款人數', async () => {
    const RegisterText = await page.$eval('#root > div > div > div > main > article > div.ant-row.css-kghr11 > div:nth-child(3) > div > div > h3', element => element.textContent.trim());
    assert.equal(RegisterText, 'จำนวนผู้ลงทะเบียนวันนี้/ยอดฝากของผู้ใช้ใหม่/จำนวนผู้ใช้ใหม่ที่ฝากเงิน', 'Statement Text element text is incorrect');
  });
  test('檢查本日遊戲前十名', async () => {
    const TopgameText = await page.$eval('#root > div > div > div > main > article > div.ant-row.css-kghr11 > div:nth-child(4) > div > div > div > div > h3', element => element.textContent.trim());
    assert.equal(TopgameText, 'เกม 10 อันดับแรกวันนี้ - ยอดเทิร์นโอเวอร์', 'Statement Text element text is incorrect');
  });
  test('檢查ccu', async () => {
    const CCUText = await page.$eval('#root > div > div > div > main > article > div.ant-row.css-kghr11 > div:nth-child(5) > div > div > h3', element => element.textContent.trim());
    assert.equal(CCUText, 'CCU', 'Statement Text element text is incorrect');
  });
});

describe.skip('檢查報表-玩家投注記錄報表內容顯示', () => {
  test('點擊儀表板', async () => {
    const xpathForsearch = "//*[text()='รายงาน']";

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
      //直接點擊
  const xpath = "//*[text()='รายงานบันทึกการเดิมพันของผู้เล่น']";
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
  test('檢查搜尋按鈕', async () => {
    const TimeText = await page.$eval('#search-form > div > div:nth-child(3) > div > div > div.ant-col.ant-form-item-control.css-kghr11 > div > div > button > span', element => element.textContent.trim());
    assert.equal(TimeText, 'ค้นหา', 'Statement Text element text is incorrect');
  });
});

describe.skip('檢查報表-遊戲報表內容顯示', () => {
  test('點擊儀表板', async () => {
    const xpathForsearch = "//*[text()='รายงาน']";

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
      //直接點擊 遊戲報表
  const xpath = "//*[text()='รายงานเกม']";
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
  test('檢查搜尋按鈕', async () => {
    const btnText = await page.$eval('#search-form > div > div:nth-child(2) > div > div > div.ant-col.ant-form-item-control.css-kghr11 > div > div > button', element => element.textContent.trim());
    assert.equal(btnText, 'ค้นหา', 'Statement Text element text is incorrect');
  });
});

describe.skip('檢查活動管理內容顯示', () => {
  test('點擊活動管理', async () => {
    const xpathForsearch = "//*[text()='รายการโปรโมชัน']";

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
      //直接點擊
  })
  test('進入活動管理後，檢查表格內容', async () => {
        
    await new Promise(resolve => setTimeout(resolve, 1000));
    const Status = await page.$eval('#root > div > div > div > main > div.ant-card.ant-card-bordered.shadow-lg.css-kghr11 > div > div > div > div > div > div > div > div > div > table > thead > tr > th:nth-child(1)', element => element.textContent.trim());
    expect(Status).toBeTruthy();
    assert.equal(Status, 'สถานะ', 'text is incorrect');
    const Image = await page.$eval('#root > div > div > div > main > div.ant-card.ant-card-bordered.shadow-lg.css-kghr11 > div > div > div > div > div > div > div > div > div > table > thead > tr > th:nth-child(2)', element => element.textContent.trim());
    expect(Image).toBeTruthy();
    assert.equal(Image, 'รูปภาพ', 'text is incorrect');
    const Name = await page.$eval('#root > div > div > div > main > div.ant-card.ant-card-bordered.shadow-lg.css-kghr11 > div > div > div > div > div > div > div > div > div > table > thead > tr > th.ant-table-cell.ant-table-cell-fix-left.ant-table-cell-fix-left-last.ant-table-cell-fix-left-all', element => element.textContent.trim());
    expect(Name).toBeTruthy();
    assert.equal(Name, 'ชื่อกิจกรรม', 'text is incorrect');
})
});

describe.skip('檢查用戶內容顯示', () => {
  test.skip('點擊單一會員查詢', async () => {
    const xpathForsearch = "//*[text()='รายการโปรโมชัน']";

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
      //直接點擊
  })
  test.skip('進入單一會員後，檢查搜尋區塊', async () => {
        
    await new Promise(resolve => setTimeout(resolve, 1000));
    const Status = await page.$eval('#root > div > div > div > main > div.ant-card.ant-card-bordered.shadow-lg.css-kghr11 > div > div > div > div > div > div > div > div > div > table > thead > tr > th:nth-child(1)', element => element.textContent.trim());
    expect(Status).toBeTruthy();
    assert.equal(Status, 'สถานะ', 'text is incorrect');
    const Image = await page.$eval('#root > div > div > div > main > div.ant-card.ant-card-bordered.shadow-lg.css-kghr11 > div > div > div > div > div > div > div > div > div > table > thead > tr > th:nth-child(2)', element => element.textContent.trim());
    expect(Image).toBeTruthy();
    assert.equal(Image, 'รูปภาพ', 'text is incorrect');
    const Name = await page.$eval('#root > div > div > div > main > div.ant-card.ant-card-bordered.shadow-lg.css-kghr11 > div > div > div > div > div > div > div > div > div > table > thead > tr > th.ant-table-cell.ant-table-cell-fix-left.ant-table-cell-fix-left-last.ant-table-cell-fix-left-all', element => element.textContent.trim());
    expect(Name).toBeTruthy();
    assert.equal(Name, 'ชื่อกิจกรรม', 'text is incorrect');
})
  test.skip('進入單一會員後，檢查表格內容', async () => {
        
    await new Promise(resolve => setTimeout(resolve, 1000));
    const Status = await page.$eval('#root > div > div > div > main > div.ant-card.ant-card-bordered.shadow-lg.css-kghr11 > div > div > div > div > div > div > div > div > div > table > thead > tr > th:nth-child(1)', element => element.textContent.trim());
    expect(Status).toBeTruthy();
    assert.equal(Status, 'สถานะ', 'text is incorrect');
    const Image = await page.$eval('#root > div > div > div > main > div.ant-card.ant-card-bordered.shadow-lg.css-kghr11 > div > div > div > div > div > div > div > div > div > table > thead > tr > th:nth-child(2)', element => element.textContent.trim());
    expect(Image).toBeTruthy();
    assert.equal(Image, 'รูปภาพ', 'text is incorrect');
    const Name = await page.$eval('#root > div > div > div > main > div.ant-card.ant-card-bordered.shadow-lg.css-kghr11 > div > div > div > div > div > div > div > div > div > table > thead > tr > th.ant-table-cell.ant-table-cell-fix-left.ant-table-cell-fix-left-last.ant-table-cell-fix-left-all', element => element.textContent.trim());
    expect(Name).toBeTruthy();
    assert.equal(Name, 'ชื่อกิจกรรม', 'text is incorrect');
})
});

describe.skip('檢查金融中心-存款內容顯示', () => {
  test.skip('點擊單一會員查詢', async () => {
    const xpathForsearch = "//*[text()='รายการโปรโมชัน']";

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
      //直接點擊
  })
  test.skip('進入單一會員後，檢查搜尋區塊', async () => {
        
    await new Promise(resolve => setTimeout(resolve, 1000));
    const Status = await page.$eval('#root > div > div > div > main > div.ant-card.ant-card-bordered.shadow-lg.css-kghr11 > div > div > div > div > div > div > div > div > div > table > thead > tr > th:nth-child(1)', element => element.textContent.trim());
    expect(Status).toBeTruthy();
    assert.equal(Status, 'สถานะ', 'text is incorrect');
    const Image = await page.$eval('#root > div > div > div > main > div.ant-card.ant-card-bordered.shadow-lg.css-kghr11 > div > div > div > div > div > div > div > div > div > table > thead > tr > th:nth-child(2)', element => element.textContent.trim());
    expect(Image).toBeTruthy();
    assert.equal(Image, 'รูปภาพ', 'text is incorrect');
    const Name = await page.$eval('#root > div > div > div > main > div.ant-card.ant-card-bordered.shadow-lg.css-kghr11 > div > div > div > div > div > div > div > div > div > table > thead > tr > th.ant-table-cell.ant-table-cell-fix-left.ant-table-cell-fix-left-last.ant-table-cell-fix-left-all', element => element.textContent.trim());
    expect(Name).toBeTruthy();
    assert.equal(Name, 'ชื่อกิจกรรม', 'text is incorrect');
})
  test.skip('進入單一會員後，檢查表格內容', async () => {
        
    await new Promise(resolve => setTimeout(resolve, 1000));
    const Status = await page.$eval('#root > div > div > div > main > div.ant-card.ant-card-bordered.shadow-lg.css-kghr11 > div > div > div > div > div > div > div > div > div > table > thead > tr > th:nth-child(1)', element => element.textContent.trim());
    expect(Status).toBeTruthy();
    assert.equal(Status, 'สถานะ', 'text is incorrect');
    const Image = await page.$eval('#root > div > div > div > main > div.ant-card.ant-card-bordered.shadow-lg.css-kghr11 > div > div > div > div > div > div > div > div > div > table > thead > tr > th:nth-child(2)', element => element.textContent.trim());
    expect(Image).toBeTruthy();
    assert.equal(Image, 'รูปภาพ', 'text is incorrect');
    const Name = await page.$eval('#root > div > div > div > main > div.ant-card.ant-card-bordered.shadow-lg.css-kghr11 > div > div > div > div > div > div > div > div > div > table > thead > tr > th.ant-table-cell.ant-table-cell-fix-left.ant-table-cell-fix-left-last.ant-table-cell-fix-left-all', element => element.textContent.trim());
    expect(Name).toBeTruthy();
    assert.equal(Name, 'ชื่อกิจกรรม', 'text is incorrect');
})
});

describe.skip('檢查金融中心-提款內容顯示', () => {
  test.skip('點擊單一會員查詢', async () => {
    const xpathForsearch = "//*[text()='รายการโปรโมชัน']";

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
      //直接點擊
  })
  test.skip('進入單一會員後，檢查搜尋區塊', async () => {
        
    await new Promise(resolve => setTimeout(resolve, 1000));
    const Status = await page.$eval('#root > div > div > div > main > div.ant-card.ant-card-bordered.shadow-lg.css-kghr11 > div > div > div > div > div > div > div > div > div > table > thead > tr > th:nth-child(1)', element => element.textContent.trim());
    expect(Status).toBeTruthy();
    assert.equal(Status, 'สถานะ', 'text is incorrect');
    const Image = await page.$eval('#root > div > div > div > main > div.ant-card.ant-card-bordered.shadow-lg.css-kghr11 > div > div > div > div > div > div > div > div > div > table > thead > tr > th:nth-child(2)', element => element.textContent.trim());
    expect(Image).toBeTruthy();
    assert.equal(Image, 'รูปภาพ', 'text is incorrect');
    const Name = await page.$eval('#root > div > div > div > main > div.ant-card.ant-card-bordered.shadow-lg.css-kghr11 > div > div > div > div > div > div > div > div > div > table > thead > tr > th.ant-table-cell.ant-table-cell-fix-left.ant-table-cell-fix-left-last.ant-table-cell-fix-left-all', element => element.textContent.trim());
    expect(Name).toBeTruthy();
    assert.equal(Name, 'ชื่อกิจกรรม', 'text is incorrect');
})
  test.skip('進入單一會員後，檢查表格內容', async () => {
        
    await new Promise(resolve => setTimeout(resolve, 1000));
    const Status = await page.$eval('#root > div > div > div > main > div.ant-card.ant-card-bordered.shadow-lg.css-kghr11 > div > div > div > div > div > div > div > div > div > table > thead > tr > th:nth-child(1)', element => element.textContent.trim());
    expect(Status).toBeTruthy();
    assert.equal(Status, 'สถานะ', 'text is incorrect');
    const Image = await page.$eval('#root > div > div > div > main > div.ant-card.ant-card-bordered.shadow-lg.css-kghr11 > div > div > div > div > div > div > div > div > div > table > thead > tr > th:nth-child(2)', element => element.textContent.trim());
    expect(Image).toBeTruthy();
    assert.equal(Image, 'รูปภาพ', 'text is incorrect');
    const Name = await page.$eval('#root > div > div > div > main > div.ant-card.ant-card-bordered.shadow-lg.css-kghr11 > div > div > div > div > div > div > div > div > div > table > thead > tr > th.ant-table-cell.ant-table-cell-fix-left.ant-table-cell-fix-left-last.ant-table-cell-fix-left-all', element => element.textContent.trim());
    expect(Name).toBeTruthy();
    assert.equal(Name, 'ชื่อกิจกรรม', 'text is incorrect');
})
});

