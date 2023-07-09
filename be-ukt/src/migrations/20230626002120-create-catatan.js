'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('catatan', {
      id_catatan: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_cabang: {
        type: Sequelize.STRING,
        allowNull: true,
        references: {
          model: "cabang",
          key: "id_cabang"
        }
      },
      id_ranting: {
        type: Sequelize.STRING,
        allowNull: true,
        references: {
          model: "ranting",
          key: "id_ranting"
        }
      },
      text: {
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('catatan');
  }
};