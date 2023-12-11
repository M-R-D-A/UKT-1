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
      id_siswa: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "siswa",
          key: "id_siswa"
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