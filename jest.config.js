module.exports = {
    reporters: [
      'default', // 默认报告器
      ['jest-junit', {
        outputDirectory: './junit', // 输出目录
        outputName: 'junit.xml', // 输出文件名
      }],
      ['jest-html-reporters', {
        publicPath: './html-report', // 输出目录
        filename: 'report.html', // 输出文件名
        expand: true, // 是否展开测试结果
      }],
    ],
  };