const { format } = require('date-fns');

// 格式化当前日期为 MMDD 格式，例如：0528
const currentDate = format(new Date(), 'MMddmmss');

module.exports = {
    reporters: [
      'default', // 默认报告器
      ['jest-junit', {
        outputDirectory: './junit', // 输出目录
        outputName: 'junit.xml', // 输出文件名
      }],
      ['jest-html-reporters', {
        publicPath: './html-report', // 输出目录
        filename: `report_${currentDate}.html`, // 输出文件名
        expand: true, // 是否展开测试结果
      }],
    ],
  };