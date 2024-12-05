const fetch = require('node-fetch'); // 確保已安裝 node-fetch

const getBackendVersion = async () => {
    try {
        const response = await fetch('https://dev-admin.botan888.co/version.json');
        if (!response.ok) {
            throw new Error(`無法取得版本資訊，HTTP 狀態碼: ${response.status}`);
        }
        const data = await response.json();
        return data.version; // 假設版本號存在於 JSON 的 "version" 屬性中
    } catch (error) {
        console.error('Error fetching backend version:', error);
        return '未知版本'; // 若有錯誤則返回預設版本
    }
};

module.exports = getBackendVersion;