const express = require('express')
const login = require('../controllers/login')
const game = require('../controllers/game')

const router = express.Router()

/* GET home page. */
router.get('/', (req, res) => {
  res.json({ title: 'Home Page' })
})

router.post('/games', game.post)
router.get('/games/:id', game.get)
module.exports = router
