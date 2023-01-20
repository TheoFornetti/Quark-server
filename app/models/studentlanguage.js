'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class studentLanguage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      studentLanguage.belongsTo(models.professionalProfile)
      studentLanguage.belongsTo(models.language)
    }
  }
  studentLanguage.init({
    level: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'studentLanguage',
    timestamps: false
  });
  return studentLanguage;
};