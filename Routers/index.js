const router = require('express').Router()
const routerStudent = require('./routerStudent')
const routerTransaction = require('./routerTransaction')
const routerBook = require('./routerBook')
const ErrorHandler = require('../middlewares/ErrorHandler')

router.use('/students', routerStudent)
router.use('/books', routerBook)
router.use('/transactions', routerTransaction)

router.use(ErrorHandler)

module.exports = router