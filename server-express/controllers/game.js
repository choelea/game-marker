const { mysql } = require('../middlewares/qcloud')
const uuidv1 = require('uuid/v1')
const logger = require('../utils/logger')


function game(name, minScore, owner, createdBy, createdTS, id) {
  return { name, minScore, owner, createdBy, createdTS, id }
}
function gameMember(gameId, userid, username, avatarUrl) {
  return { gameId, userid, username, avatarUrl }
}
async function post(req, res, next) {
  logger.debug('###################################################')
  try {
    const { body } = req
    const userInfo = req.$wxInfo.userinfo
    const gameId = uuidv1()
    await mysql('game').insert(game(body.name, body.minScore, userInfo.openId, userInfo.openId, new Date(), gameId))
    await mysql('gamemember').insert(gameMember(gameId, userInfo.openId, userInfo.nickName, userInfo.avatarUrl))
    res.json(gameId)
  } catch (e) {
    logger.error(e)
    const err = new Error('Not Found')
    err.status = 500
    err.code = 'ERR_GM_HHH'
    err.message = 'Failed to create new game!'
    next(err)
  }
}


async function get(req, res) {
  const gameId = req.params.id
  let currentGame = null
  try {
    const games = await mysql('game').where({ id: gameId }).select('name', 'minScore', 'records')
    if (games && games.length > 0) {
      currentGame = games[0]
      const members = await mysql('gamemember').where({ game: gameId }).select('userid', 'username', 'avatarUrl')
      currentGame.members = members
      res.json({ game: currentGame })
    } else {
      res.status(400).json({ msg: 'Cannot find the given game' })
    }
  } catch (e) {
    // logger.debug(e)
    res.status(500).json('Error happened')
  }
}

module.exports = { post, get }
