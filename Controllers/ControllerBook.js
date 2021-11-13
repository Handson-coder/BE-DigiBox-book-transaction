const { Book } = require('../models')

class ControllerBook {
  static async findAllBooks(req, res, next) {
    try {
      const result = await Book.findAll()
      res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }

  static async findOneBook(req, res, next) {
    const { id } = req.params
    try {
      const result = await Book.findByPk(id)
      if (result) {
        res.status(200).json(result)
      }
      else {
        throw ({ name: 'Data not found' })
      }
    } catch (err) {
      next(err)
    }
  }

  static async createNewBook(req, res, next) {
    const data = {
      title: req.body.title,
      price: req.body.price,
    }
    try {
      const result = await Book.create(data)
      res.status(201).json(result)
    } catch (err) {
      next(err)
    }
  }

  static async deleteBook(req, res, next) {
    const { id } = req.params
    try {
      const foundBook = await Book.findByPk(id)
      if (foundBook) {
        await Book.destroy({ where: { id } })
        res.status(200).json({ message: `Book with title ${foundBook.title} has been deleted` })
      } else {
        throw ({ name: 'Data not found' })
      }
    } catch (err) {
      next(err)
    }
  }

  static async editBook(req, res, next) {
    const { id } = req.params
    const data = {
      title: req.body.title,
      price: req.body.price,
    }
    try {
      const foundBook = await Book.findByPk(id)
      if (foundBook) {
        const result = await Book.update(data, { where: { id }, returning: true })
        res.status(200).json(result[1][0])
      } else {
        throw ({ name: 'Data not found' })
      }
    } catch (err) {
      next(err)
    }
  }

}

module.exports = ControllerBook