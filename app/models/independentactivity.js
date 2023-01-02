'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class independentActivity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      independentActivity.belongsTo(models.professionalProfile)
    }
  }
  independentActivity.init({
    beginDate: DataTypes.DATE,
    description: DataTypes.STRING,
    endDate: DataTypes.DATE,
    state: DataTypes.STRING,
    title: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'independentActivity',
    timestamps: false
  });
  return independentActivity;
};