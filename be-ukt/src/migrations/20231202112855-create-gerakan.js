'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('gerakan', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_gerakan: {
        type: Sequelize.INTEGER
      },
      id_nilai_sambung: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "nilai_sambung",
          key: "id_nilai_sambung"
        }
      },
      id_detail_sambung: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "detail_sambung",
          key: "id_detail_sambung"
        }
      },
      green: {
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('gerakan');
  }
};