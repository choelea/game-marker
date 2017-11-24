const { mysql } = require('../middlewares/qcloud')
const logger = require('./logger')

async function isMatch(game, userid) {
  try {
    const member = await mysql('gamemember').where({ game, userid }).select('username', 'userid', 'avatarUrl')
    if (member.lenght > 0) {
      return true
    }
    return false
  } catch (e) {
    logger.error(e)
    return false
  }
}

module.exports = { isMatch }
