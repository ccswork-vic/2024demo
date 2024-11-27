// 檢查文本是否存在
const checkTitlesExist = (titles, expectedTexts, testName = '未指定測試') => {
    const missingTexts = expectedTexts.filter(text => !titles.includes(text));
  
    // 動態打印缺少的文本
    if (missingTexts.length > 0) {
      console.log(`[${testName}] 缺少的文本:`, missingTexts.join(', '));
    }
  
    expectedTexts.forEach(text => {
      expect(titles.includes(text)).toBeTruthy(); // 確認文本存在
    });
  };
  
  module.exports = {
    checkTitlesExist,
  };
  
  // 檢查圖片是否存在
  const checkBannersExist = async (page, bannersrc) => {
    const missingBanners = [];  // 用來儲存缺少的圖片
  
    for (const src of bannersrc) {
      const bannerImage = await page.$(`.swiper-slide img[src="${src}"]`);
      
      if (!bannerImage) {
        missingBanners.push(src);  // 如果圖片找不到，加入缺少的陣列
      }
    }
  
    // 如果有缺少的圖片，列印出來
    if (missingBanners.length > 0) {
      console.log('缺少的 banner 圖片:', missingBanners.join(', '));
    }
  
    // 確保每張圖片都存在
    for (const src of bannersrc) {
      const bannerImage = await page.$(`.swiper-slide img[src="${src}"]`);
      expect(bannerImage).toBeTruthy(); // 確認圖片存在
    }
  };
  
  module.exports = {
    checkTitlesExist,
    checkBannersExist,
  };