'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable(
        'EducationPrograms',
        {
          id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          levelId: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
              model: 'EducationLevels',
              key: 'id',
            },
          },
          courseId: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
              model: 'EducationCourses',
              key: 'id',
            },
          },
          positionId: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
              model: 'Positions',
              key: 'id',
            },
          },
          upToDate: {
            type: Sequelize.DATE,
            allowNull: true,
            comment: 'Дата окончания обучения',
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

    await queryInterface.dropTable('EducationPrograms');
  },
};
