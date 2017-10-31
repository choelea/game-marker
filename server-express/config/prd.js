const fs = require('fs')
const logger = require('../utils/logger')

// 获取 sdk.config
const sdkConfig = (() => {
  const sdkConfigPath = '/data/release/sdk.config.json'

  // 检查文件是否存在
  try {
    const stats = fs.statSync(sdkConfigPath)

    if (!stats.isFile()) {
      logger.info('sdk.config.json 不存在，将使用 config.js 中的配置')
      return {}
    }
  } catch (e) {
    logger.info(`cannot find the give file: + ${sdkConfigPath}`)
    return {}
  }

  // 返回配置信息
  try {
    const content = fs.readFileSync(sdkConfigPath, 'utf8')
    return JSON.parse(content)
  } catch (e) {
    // 如果配置读取错误或者 JSON 解析错误，则输出空配置项
    logger.info('sdk.config.json 解析错误，不是 JSON 字符串')
    return {}
  }
})()
module.exports = sdkConfig
