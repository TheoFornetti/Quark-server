'use strict';
const {
  Model
} = require('sequelize');
const professionalprofile = require('./professionalprofile');
module.exports = (sequelize, DataTypes) => {
  class sesskey extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      sesskey.belongsTo(models.professionalProfile)
    }
  }
  sesskey.init({
    sesskey: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'sesskey',
    timestamps: false
  });
  return sesskey;
};