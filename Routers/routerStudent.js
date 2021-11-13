const router = require('express').Router()
const ControllerStudent = require('../Controllers/ControllerStudent')
const authentication = require('../Middlewares/authentication')

router.post('/register', ControllerStudent.register)
router.post('/login', ControllerStudent.login)
router.use(authentication)
router.get('/profile', ControllerStudent.getStudentProfile)
router.delete('/delete/account', ControllerStudent.deleteAccount)
router.put('/edit/profile', ControllerStudent.editProfile)

module.exports = router