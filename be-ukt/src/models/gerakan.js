'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class gerakan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.nilai_sambung, {
        foreignKey: "id_nilai_sambung",
        as: "gerakan_nilai_sambung"
      })
      this.belongsTo(models.detail_sambung, {
        foreignKey: "id_detail_sambung",
        as: "gerakan_detail_sambung"
      })
    }
  }
  gerakan.init({
    id_gerakan: DataTypes.INTEGER,
    id_nilai_sambung: DataTypes.INTEGER,
    id_detail_sambung: DataTypes.INTEGER,
    green: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'gerakan',
    tableName: 'gerakan'
  });
  return gerakan;
};