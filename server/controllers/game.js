const { mysql } = require('../qcloud')

function game(name, minScore, owner, created) {
    return { name, minScore, owner, created }
}

async function post(ctx, next) {
    const body = ctx.request.body
    const result = await mysql('game').insert(game('桌球', 5, '3245678976543456', new Date()))
    console.log(result)
    ctx.body = 'success'
}

module.exports = { post }
