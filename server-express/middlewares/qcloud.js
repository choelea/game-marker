

// 获取基础配置
const config = require('../config')

const qcloud = require('wafer-node-sdk')
const logger = require('../utils/logger')

// 初始化 SDK
// 将基础配置和 sdk.config 合并传入 SDK 并导出初始化完成的 SDK
const myQcloud = qcloud(config)
const { mysql } = myQcloud

function authorization(req, res, next) {
  try {
    myQcloud.auth.authorization(req).then((result) => {
      if (result && result.loginState === 1) {
        req.wxInfo = req.wxInfo || {}
        req.wxInfo.userinfo = result.userinfo
        req.wxInfo.loginState = result.loginState
        next()
      } else {
        logger.error('Failed to validate the user')
        res.sendStatus(401)
      }
    })
  } catch (err) {
    logger.error(err)
    res.sendStatus(401)
  }
}
function validation(req, res, next) {
  try {
    myQcloud.auth.validation(req).then((result) => {
      if (result && result.loginState === 1) {
        req.wxInfo = req.wxInfo || {}
        req.wxInfo.userinfo = result.userinfo
        req.wxInfo.loginState = result.loginState
        next()
      } else {
        logger.error('Failed to authorize the user')
        res.sendStatus(401)
      }
    })
  } catch (err) {
    logger.error(err)
    res.sendStatus(401)
  }
}

module.exports = { mysql, authorization, validation, myQcloud }
