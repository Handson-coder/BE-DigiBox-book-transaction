const { Student } = require("../models")
const { checkPassword } = require("../helpers/bcryptjs")
const { signToken } = require("../helpers/jwt")

class ControllerStudent {
  static async register(req, res, next) {
    const { username, email, password } = req.body
    try {
      const result = await Student.create({ username, email, password })
      res.status(201).json({
        id: result.id,
        username: result.username,
        email: result.email
      })
    } catch (err) {
      next(err)
    }
  }

  static async login(req, res, next) {
    const { email, password } = req.body
    try {
      const student = await Student.findOne({ where: { email } })
      if (!student) {
        throw ({ name: "Email/Password is wrong" })
      } else {
        if (checkPassword(password, student.password)) {
          const access_token = signToken({ id: student.id, email: student.email, username: student.username })
          res.status(200).json({ id: student.id, username: student.username, email: student.email, access_token })
        } else {
          throw ({ name: "Email/Password is wrong" })
        }
      }
    } catch (err) {
      next(err)
    }
  }

  static async getStudentProfile(req, res, next) {
    const { id } = req.user
    try {
      const result = await Student.findOne({ where: { id } })
      res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }

  static async deleteAccount(req, res, next) {
    try {
      const foundStudent = await Student.findOne({ where: { id: req.user.id } })
      if (foundStudent) {
        await Student.destroy({ where: { id: req.user.id } })
        res.status(200).json({ message: `Success deleted your account` })
      } else {
        throw ({ name: 'Data not found' })
      }
    } catch (err) {
      next(err)
    }
  }

  static async editProfile(req, res, next) {
    const data = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    }
    try {
      const foundStudent = await Student.findOne({ where: { id: req.user.id } })
      if (foundStudent) {
        const result = await Student.update(data, { where: { id: req.user.id }, returning: true, individualHooks: true })
        res.status(200).json({
          id: result[1][0].id,
          username: result[1][0].username,
          email: result[1][0].email,
        })
      } else {
        throw ({ name: 'Data not found' })
      }
    } catch (err) {
      next(err)
    }
  }
}

module.exports = ControllerStudent