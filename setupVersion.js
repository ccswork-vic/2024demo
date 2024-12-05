const getVersion = require('./__tests__/utils/getversion'); // 引用你的工具函數

module.exports = async () => {
    try {
        const version = await getVersion(); // 取得版本號
        process.env.PROJECT_VERSION = version; // 儲存到環境變數
        console.log(`測試開始，版本號: ${version}`); // 打印版本號供調試
    } catch (error) {
        console.error('取得版本號失敗:', error);
        throw error; // 若出現錯誤，停止測試
    }
};