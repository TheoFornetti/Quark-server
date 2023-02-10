'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class questionnaire extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      questionnaire.hasMany(models.question)
      questionnaire.hasMany(models.answer)
      
    }
  }
  questionnaire.init({
    name: DataTypes.STRING,
    
  }, {
    sequelize,
    modelName: 'questionnaire',
    timestamps: false
    
  });
  return questionnaire;
};