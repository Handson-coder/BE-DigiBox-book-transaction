const router = require('express').Router()
const ControllerBook = require('../Controllers/ControllerBook')

router.get('/', ControllerBook.findAllBooks)
router.get('/:id', ControllerBook.findOneBook)
router.post('/', ControllerBook.createNewBook)
router.delete('/:id', ControllerBook.deleteBook)
router.put('/:id', ControllerBook.editBook)

module.exports = router