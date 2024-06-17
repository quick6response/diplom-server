'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable(
        'EducationCourses',
        {
          id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          name: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          code: {
            type: Sequelize.STRING,
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

      await queryInterface.bulkInsert(
        'EducationCourses',
        [
          {
            name: 'Информационная безопасность',
            code: '100',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: 'Расстановка книжной продукции на полки библиотеки',
            code: '201',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: 'Сортировка книжной продукции библиотеки',
            code: '202',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
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

    await queryInterface.dropTable('EducationCourses');
  },
};
