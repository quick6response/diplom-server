'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable(
        'Employees',
        {
          id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          firstName: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          lastName: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          middleName: {
            type: Sequelize.STRING,
            allowNull: true,
          },
          login: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          numberPhone: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          passportSerial: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
          passportNumber: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.fn('NOW'),
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.fn('NOW'),
          },
        },
        {
          transaction,
        },
      );

      await queryInterface.createTable(
        'EmployeePositions',
        {
          id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          number: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 1,
          },
          employeeId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'Employees',
              key: 'id',
            },
          },
          positionId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'Positions',
              key: 'id',
            },
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.fn('NOW'),
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.fn('NOW'),
          },
        },
        {
          transaction,
        },
      );

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.dropTable('EmployeePositions');
    await queryInterface.dropTable('Employees');
  },
};
