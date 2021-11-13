const { verifyToken } = require('../helpers/jwt')
const { Student } = require('../models')

async function authentication(req, res, next) {
  try {
    const { access_token } = req.headers
    if (access_token) {
      const verified = verifyToken(access_token)
      const student = await Student.findByPk(verified.id)
      if (student) {
        req.user = {
          id: student.id,
          username: student.username,
          email: student.email,
        }
        next()
      } else {
        throw { name: "Invalid Token" }
      }
    } else {
      throw { name: 'Please Login First' }
    }
  } catch (err) {
    next(err)
  }
}

module.exports = authentication