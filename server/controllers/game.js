const { mysql } = require('../qcloud')
const uuidv1 = require('uuid/v1')

function game(name, minScore, owner, createdBy, createdTS) {
    return { name, minScore, owner, createdBy, createdTS, id: uuidv1() }
}

async function post(ctx, next) {
    console.log('###################################################')
    const body = ctx.request.body
    console.log('Starting.......' + body)
    console.log(ctx.state.$wxInfo)
    let errorMsg = null
    const result = await mysql('game').insert(game('桌球', 5, uuidv1(), uuidv1(), new Date())).catch(function (error) {
        errorMsg = 'error'
    })
    if (errorMsg) {
        ctx.body = errorMsg
    } else {
        ctx.body = 'success'
    }
}

module.exports = { post }
