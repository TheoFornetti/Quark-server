'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class laborActivity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      laborActivity.belongsTo(models.professionalProfile)
    }
  }
  laborActivity.init({
    company: DataTypes.STRING,
    beginDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    state: DataTypes.STRING,
    title: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'laborActivity',
    timestamps: false
  });
  return laborActivity;
};