'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class scholarship extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      scholarship.belongsTo(models.professionalProfile)
      scholarship.belongsTo(models.scholarshipType)
      
    }
  }
  scholarship.init({
    beginDate: DataTypes.DATE,
    endDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'scholarship',
    timestamps: false
    
  });
  return scholarship;
};