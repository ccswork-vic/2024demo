const fetch = require('node-fetch');

const getVersion = async () => {
  try {
    const response = await fetch('https://dev.botan888.co/version.json');
    const data = await response.json();
    return data.version; // 根據你的資料結構，提取 `version`
  } catch (error) {
    console.error('⚠️ 無法取得版本號:', error);
    return 'Unknown'; // 如果失敗，返回 'Unknown'
  }
};

module.exports = getVersion;