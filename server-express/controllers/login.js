

// 登录授权接口
module.exports = (req, res, next) => {
  // 通过 Koa 中间件进行登录之后
  // 登录信息会被存储到 ctx.state.$wxInfo
  // 具体查看：
  if (req.wxInfo && req.wxInfo.loginState) {
    req.$data = req.wxInfo.userInfo
  }
  next()
}
