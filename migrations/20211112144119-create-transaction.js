'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      StudentId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      BookId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      rent_date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      due_date_rent: {
        allowNull: false,
        type: Sequelize.DATE
      },
      rent_price: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      is_paid: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Transactions');
  }
};