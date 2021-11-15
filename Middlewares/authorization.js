const { Student, Book, Transaction } = require('../models')
const { checkRentPayment } = require("../helpers/ConverterDate")

const authorizationRent = async (req, res, next) => {
  const { id } = req.params
  try {
    const foundBook = await Book.findByPk(id)
    if (foundBook) {
      if (foundBook.is_rent === false) {
        next()
      } else {
        throw ({ name: 'Book is already rented by someone' })
      }
    } else {
      throw ({ name: 'Book is not found' })
    }
  } catch (err) {
    next(err)
  }
}

const authorizationTransaction = async (req, res, next) => {
  const { id } = req.params
  try {
    const foundTransaction = await Transaction.findByPk(id, {
      include: [
        {
          model: Student
        }
      ]
    })
    if (foundTransaction) {
      if (req.user.id === foundTransaction.Student.id) {
        next()
      } else {
        throw ({ name: 'This is not yours' })
      }
    } else {
      throw ({ name: 'Transaction is not found' })
    }
  } catch (err) {
    next(err)
  }
}

const authorizationDeleteTransaction = async (req, res, next) => {
  const { id } = req.params
  try {
    const foundTransaction = await Transaction.findByPk(id)
    if (foundTransaction) {
      if (foundTransaction.is_paid === true) {
        next()
      } else {
        throw ({ name: 'Transaction payment is not completed' })
      }
    } else {
      throw ({ name: 'Transaction is not found' })
    }
  } catch (err) {
    next(err)
  }
}

const changeRentPrice = async (req, res, next) => {
  const { id } = req.params
  const paymentTime = new Date()
  let lateFeeMultiplier = 0
  let finalPrice = 0
  try {
    const foundTransaction = await Transaction.findByPk(id, {
      include: [
        {
          model: Book
        }
      ]
    })
    if (foundTransaction) {
      lateFeeMultiplier = checkRentPayment(paymentTime, foundTransaction.due_date_rent)
      if (lateFeeMultiplier >= 0) {
        finalPrice = (lateFeeMultiplier * 5000) + foundTransaction.rent_price
      } else {
        finalPrice = foundTransaction.rent_price
      }
      await Transaction.update({ rent_price: finalPrice }, { where: { id: foundTransaction.id }, returning: true })
      next()

    } else {
      throw ({ name: 'Transaction is not found' })
    }
  } catch (err) {
    next(err)
  }
}

module.exports = { authorizationRent, authorizationTransaction, authorizationDeleteTransaction, changeRentPrice }