// 通用的檢查函數
const checkExist = (items, expectedItems, testName = '未指定測試') => {
    const missingItems = expectedItems.filter(item => !items.includes(item));
  
    // 動態打印缺少的元素
    if (missingItems.length > 0) {
      console.log(`[${testName}] 缺少的項目:`, missingItems.join(', '));
    }
  
    // 確保每個項目都存在
    expectedItems.forEach(item => {
      expect(items.includes(item)).toBeTruthy(); // 確認項目存在
    });
  };
  
  module.exports = { checkExist };