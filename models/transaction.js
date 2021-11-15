'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.Student, { foreignKey: 'StudentId' })
      Transaction.belongsTo(models.Book, { foreignKey: 'BookId' })
    }
  };
  Transaction.init({
    StudentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'StudentId is required' },
        notNull: { msg: 'StudentId is required' }
      }
    },
    BookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'BookId is required' },
        notNull: { msg: 'BookId is required' }
      }
    },
    rent_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Rent Date is required' },
        notNull: { msg: 'Rent Date is required' }
      }
    },
    due_date_rent: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Due Date Rent is required' },
        notNull: { msg: 'Due Date Rent is required' }
      }
    },
    rent_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Due Date Rent is required' },
        notNull: { msg: 'Due Date Rent is required' }
      }
    },
    is_paid: {
      type: DataTypes.BOOLEAN,
    }
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};