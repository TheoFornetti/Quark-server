'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class academicActivity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      academicActivity.belongsTo(models.professionalProfile);
    }
  }
  academicActivity.init({
    institution: DataTypes.STRING,
    description: DataTypes.STRING,
    beginDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    state: DataTypes.STRING,
    title: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'academicActivity',
    timestamps: false
  });

  
  return academicActivity;
};