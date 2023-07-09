'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class nilai_sambung extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  nilai_sambung.init({
    id_nilai_sambung: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: DataTypes.STRING,
    tipe: DataTypes.BOOLEAN,
    nilai1: DataTypes.INTEGER,
    nilai2: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'nilai_sambung',
    tableName: 'nilai_sambung'
  });
  return nilai_sambung;
};