const { Transaction, Student, Book } = require('../models')
const { dueDate } = require('../helpers/ConverterDate')

class ControllerTransaction {
  static async findAllTransactions(req, res, next) {
    try {
      const result = await Transaction.findAll({
        where: { StudentId: req.user.id },
        include: [
          {
            model: Student,
          },
          {
            model: Book,
          }
        ],
      })
      res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }

  static async rentBook(req, res, next) {
    const { id } = req.params
    const rent_date = new Date()
    const dueDateRent = dueDate(rent_date)
    try {
      const foundBook = await Book.findByPk(id)
      if (foundBook) {
        const data = {
          StudentId: req.user.id,
          BookId: foundBook.id,
          rent_date,
          due_date_rent: dueDateRent,
          rent_price: foundBook.price,
          is_paid: false
        }
        const createdTransaction = await Transaction.create(data)
        await Book.update({ is_rent: true }, { where: { id: foundBook.id }, returning: true })
        const result = await Transaction.findOne({
          where: { id: createdTransaction.id }, include: [
            {
              model: Student,
            },
            {
              model: Book,
            }
          ]
        })
        res.status(201).json(result)
      } else {
        throw ({ name: 'Book is not found' })
      }
    } catch (err) {
      next(err)
    }
  }

  static async deleteTransaction(req, res, next) {
    const { id } = req.params
    try {
      const foundTransaction = await Transaction.findByPk(id, {
        include: [
          {
            model: Book
          }
        ]
      })
      if (foundTransaction) {
        await Transaction.destroy({ where: { id: foundTransaction.id } })
        res.status(200).json({ message: `Rent Book with Title: ${foundTransaction.Book.title} successfully removed from your transaction list` })
      } else {
        throw ({ name: 'Transaction is not found' })
      }
    } catch (err) {
      next(err)
    }
  }

  static async payTheTransaction(req, res, next) {
    const { id } = req.params
    const { rent_price } = req.body
    try {
      const foundTransaction = await Transaction.findByPk(id, {
        include: [
          {
            model: Book
          }
        ]
      })
      if (foundTransaction) {
        if (+rent_price >= foundTransaction.rent_price) {
          await Transaction.update({ is_paid: true }, { where: { id: foundTransaction.id }, returning: true })
          await Book.update({ is_rent: false }, { where: { id: foundTransaction.Book.id }, returning: true })
          res.status(200).json({ message: `Congratulations on your successful payment, refund : ${rent_price - foundTransaction.rent_price}, please come back again to rent our book` })
        } else {
          throw ({ name: "Insufficient Payment" })
        }
      } else {
        throw ({ name: 'Transaction is not found' })
      }
    } catch (err) {
      next(err)
    }
  }
}

module.exports = ControllerTransaction