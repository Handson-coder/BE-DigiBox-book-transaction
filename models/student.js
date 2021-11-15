'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Student.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Username is required' },
        notNull: { msg: 'Username is required' }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Password is required' },
        notNull: { msg: 'Password is required' },
        len: {
          args: [5, 30],
          msg: 'Min Length of Password is 5 or Max Length of Password is 30'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: { msg: 'Must be email format' },
        notEmpty: { msg: 'Email is required' },
        notNull: { msg: 'Email is required' }
      }
    }
  }, {
    sequelize,
    modelName: 'Student',
    hooks: {
      beforeCreate: (student, options) => {
        student.password = hashPassword(student.password)
      },
      beforeUpdate: (student, options) => {
        student.password = hashPassword(student.password)
      }
    }
  });
  return Student;
};