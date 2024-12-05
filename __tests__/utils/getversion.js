const fetch = require('node-fetch'); // 確保已安裝 node-fetch

const getVersion = async () => {
    const response = await fetch('https://dev.botan888.co/version.json');
    if (!response.ok) {
        throw new Error(`無法取得版本資訊，HTTP 狀態碼: ${response.status}`);
    }
    const data = await response.json();
    return data.version; // 假設版本號存在於 JSON 的 "version" 屬性中
};

module.exports = getVersion;