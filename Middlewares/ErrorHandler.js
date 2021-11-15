module.exports = function (err, req, res, next) {
  console.log(err);
  let code = err.code || 500;
  let message = "Internal Server Error";

  if (err.name === "SequelizeUniqueConstraintError") {
    code = 400;
    message = `${req.body.email} already registered`;
  } else if (err.name === "SequelizeValidationError") {
    let errors = err.errors.map((l) => {
      return l.message;
    });
    code = 400;
    message = errors;
  } else if (err.name === "Unauthorized") {
    code = 401;
    message = "Email/Password is wrong";
  } else if (err.name === "JsonWebTokenError") {
    code = 401;
    message = "Invalid Token";
  } else if (err.name === "Book is not found") {
    code = 404
    message = "Book is not found"
  } else if (err.name === "Data not found") {
    code = 404
    message = "Data not found"
  } else if (err.name === "Transaction is not found") {
    code = 404
    message = "Transaction is not found"
  } else if (err.name === "Insufficient Payment") {
    code = 403
    message = "Insufficient Payment"
  } else if (err.name === "Book is already rented by someone") {
    code = 403
    message = "Book is already rented by someone"
  } else if (err.name === "This is not yours") {
    code = 403
    message = "This is not yours"
  } else if (err.name === "Transaction payment is not completed") {
    code = 403
    message = "Sorry, the transaction cannot be deleted because you have not completed the transaction payment"
  }
  res.status(code).json({ message });
};