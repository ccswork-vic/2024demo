const closeDialogIfExists = async (page) => {
  try {
    // 查找所有彈窗
    const dialogSelector = 'div[role="dialog"]';
    let dialogs = await page.$$(dialogSelector);

    while (dialogs.length > 0) {
      console.log(`檢測到 ${dialogs.length} 個彈窗，準備逐一關閉...`);

      // 優先嘗試使用鍵盤關閉
      await page.keyboard.press('Escape');

      // 等待短暫時間，檢查彈窗是否關閉
      await new Promise(resolve => setTimeout(resolve, 500));  // 等待 500 毫秒
      dialogs = await page.$$(dialogSelector);

      if (dialogs.length > 0) {
        console.log('部分彈窗未關閉，嘗試點擊空白處...');
        // 點擊空白處關閉彈窗
        await page.mouse.click(100, 300);
        await new Promise(resolve => setTimeout(resolve, 500)); // 再次等待
      }

      // 更新剩餘彈窗數量
      dialogs = await page.$$(dialogSelector);
    }

    console.log('所有彈窗已關閉，繼續執行腳本...');
  } catch (error) {
    console.error('檢查並關閉彈窗時發生錯誤:', error);
    throw error; // 停止腳本執行
  }
};

module.exports = closeDialogIfExists;
