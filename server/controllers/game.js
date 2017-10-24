const { mysql } = require('../qcloud')
const uuidv1 = require('uuid/v1')

function game(name, minScore, owner, createdBy, createdTS, id) {
    return { name, minScore, owner, createdBy, createdTS, id }
}
function gameMember(game, userid, username, avatarUrl) {
    return { game, userid, username, avatarUrl }
}
async function post(ctx, next) {
    console.log('###################################################')
    console.log(ctx.state.$wxInfo)
    const body = ctx.request.body
    const userInfo = ctx.state.$wxInfo.userinfo
    const gameId = uuidv1()
    await mysql('game').insert(game(body.name, body.minScore, userInfo.openId, userInfo.openId, new Date(), gameId))
    await mysql('gamemember').insert(gameMember(gameId, userInfo.openId, userInfo.nickName, userInfo.avatarUrl))
    ctx.body = ctx.body || {}
    ctx.body.gameId = gameId
}

async function get(ctx, next) {
    const gameId = ctx.params.id
    let currentGame = null
    const games = await mysql('game').where({ id: gameId }).select('name', 'minScore', 'records')
    if (games && games.length > 0) {
        currentGame = games[0]
        const members = await mysql('gamemember').where({ game: gameId }).select('userid', 'username', 'avatarUrl')
        currentGame.members = members
        ctx.body = ctx.body || {}
        ctx.body.game = currentGame
    } else {
        ctx.throw(400, `No game founded with game id:${gameId}`)
    }
}

module.exports = { post, get }
