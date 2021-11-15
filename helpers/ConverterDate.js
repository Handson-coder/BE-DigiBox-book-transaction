const dueDate = (time) => {
  let result;
  let date = time.getDate() + 2
  let month = time.getMonth()
  let year = time.getFullYear()
  result = new Date(year, month, date)
  return result
}

const checkRentPayment = (paymentTime, dueDateRent) => {
  const diffTime = Math.floor(paymentTime - dueDateRent)
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

module.exports = { checkRentPayment, dueDate }