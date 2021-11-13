const router = require('express').Router()
const routerStudent = require('./routerStudent')
// const routerMovie = require('./routerMovie')
const routerBook = require('./routerBook')
// const errorHandler = require('../middlewares/errorHandler')

router.use('/students', routerStudent)
router.use('/books', routerBook)
// router.use('/movies', routerMovie)

// router.use(errorHandler)

module.exports = router