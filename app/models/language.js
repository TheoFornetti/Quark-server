'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class language extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      language.hasMany(models.studentLanguage)
    }
  }
  language.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'language',
    timestamps: false
  });
  return language;
};