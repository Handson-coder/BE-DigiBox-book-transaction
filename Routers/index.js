const router = require('express').Router()
const routerStudent = require('./routerStudent')
// const routerMovie = require('./routerMovie')
// const routerFavourite = require('./routerFavourite')
// const errorHandler = require('../middlewares/errorHandler')

router.use('/students', routerStudent)
// router.use('/favourites', routerFavourite)
// router.use('/movies', routerMovie)

// router.use(errorHandler)

module.exports = router