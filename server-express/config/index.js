const local = require('./local')
const prd = require('./prd')
const defaultConf = require('./default')

const env = {
  local,
  prd,
}
// TODO: ensure the NODE_ENV must equal to short name defined above
const activeEnv = env[process.env.NODE_ENV || 'local']
const config = Object.assign(defaultConf, activeEnv)

module.exports = config
