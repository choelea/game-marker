

// 获取基础配置
const config = require('../config')

console.log(config)
const qcloud = require('wafer-node-sdk')
const logger = require('../utils/logger')

// 初始化 SDK
// 将基础配置和 sdk.config 合并传入 SDK 并导出初始化完成的 SDK
const { auth: { cloudAuthorization }, mysql } = qcloud(config)

module.exports.mysql = mysql
// express
module.exports.authorization = (req, res, next) => {
  cloudAuthorization(req).then((result) => {
    if (result && result.loginState === 0) {
      req.$wxInfo.userInfo = result.userinfo
      req.$wxInfo.loginState = result.loginState
    }
    return next()
  })
  logger.error('Failed to authorize the user')
  return res.sendStatus(401)
}
