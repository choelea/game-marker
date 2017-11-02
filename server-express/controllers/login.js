

// 登录授权接口
module.exports = (req, res) => {
  // 通过 Koa 中间件进行登录之后
  // 登录信息会被存储到 ctx.state.$wxInfo
  // 具体查看：
  if (req.wxInfo && req.wxInfo.loginState) {
    return res.json({ code: 0, data: req.wxInfo.userInfo })
  }
  return res.status(401).json({ code: '-1' })
}
