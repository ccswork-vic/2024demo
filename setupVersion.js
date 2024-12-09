const getVersion = require('./__tests__/utils/getFrontendVersion'); // 引用你的工具函數
const getBackendVersion = require('./__tests__/utils/getBackendVersion'); // 引用後台版本號的函數

module.exports = async () => {
    console.log('setupVersion.js is running...');
    try {
        const isBotanCasinoTest = process.argv.some(arg => arg.includes('botan-casino'));
        const isBotanAdTest = process.argv.some(arg => arg.includes('botanad'));

        // 取得前台版本號並控制是否打印
        if (isBotanCasinoTest) {
        const frontendVersion = await getVersion(); 
        process.env.FRONTEND_PROJECT_VERSION = frontendVersion; // 儲存到環境變數
        console.log(`測試開始，前台版本號: ${frontendVersion}`); // 打印前台版本號
        }

        // 取得後台版本號
        if (isBotanAdTest) {
        const backendVersion = await getBackendVersion(); 
        process.env.BACKEND_PROJECT_VERSION = backendVersion; // 儲存到環境變數
        console.log(`測試開始，後台版本號: ${backendVersion}`); // 打印後台版本號
        }
    } catch (error) {
        console.error('取得版本號失敗:', error);
        throw error; // 若出現錯誤，停止測試
    }
};