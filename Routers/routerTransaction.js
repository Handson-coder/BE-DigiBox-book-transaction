const router = require('express').Router()
const ControllerTransaction = require('../Controllers/ControllerTransaction')
const authentication = require('../Middlewares/authentication')
const { authorizationRent, authorizationTransaction, authorizationDeleteTransaction, changeRentPrice } = require('../Middlewares/authorization')

router.use(authentication)
router.get('/', ControllerTransaction.findAllTransactions)
router.post('/:id', authorizationRent, ControllerTransaction.rentBook)
router.delete('/delete/:id', authorizationTransaction, authorizationDeleteTransaction, ControllerTransaction.deleteTransaction)
router.patch('/:id/payment', authorizationTransaction, changeRentPrice, ControllerTransaction.payTheTransaction)

module.exports = router