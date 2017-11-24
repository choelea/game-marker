const WebSocket = require('ws')
const url = require('url')
const logger = require('./utils/logger')
const { myQcloud } = require('./middlewares/qcloud')
const { isMatch } = require('./utils/gameServices')

async function verifyClient(info, cb) {
  try {
    const { gameId } = info.req.query
    const result = await myQcloud.auth.validation(info.req)
    if (result.loginState) {
      const { req } = info
      req.userinfo = result.userinfo
      const isMatched = isMatch(gameId, result.userinfo.openId)
      if (isMatched) {
        cb(true)
      } else {
        cb(false, 403, 'Unauthorized')
      }
    } else {
      cb(false, 401, 'Unauthorized')
    }
  } catch (e) {
    logger.error('Error happened when verifyClient')
    logger.error(e)
    cb(false, 401, 'Unauthorized')
  }
}

module.exports = (server) => {
  // ########################################## Websocket Testing Begins ###########################################
  //  Open Browser with multiple tabs and access http://localhost:9001/websocket; try to type some message and send it out to say what will happen.
  const wss = new WebSocket.Server({ server, verifyClient })

  wss.on('connection', (ws, req) => {
    const location = url.parse(req.url, true)
    // You might use location.query.access_token to authenticate or share sessions
    // or req.headers.cookie (see http://stackoverflow.com/a/16395220/151312)
    // (http://en.wikipedia.org/wiki/Same_origin_policy)
    myQcloud.auth.validation(req)
    logger.info(`Current Clients: ${JSON.stringify(wss.clients)}`)
    ws.on('message', (message) => {
      logger.info(`received: ${message}`)
      wss.clients.forEach((client) => {
        client.send(JSON.stringify({ type: 'message', data: { color: 'green', author: 'No One', text: message } }))
      })
    })

    ws.send('something')
  })
  // ########################################## Websocket Testing Ends ###########################################
}

