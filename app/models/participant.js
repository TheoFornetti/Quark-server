'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class participant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      participant.belongsTo(models.professionalProfile)
    }
  }
  participant.init({
    
    state: DataTypes.STRING,
    observation: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'participant',
    timestamps: true
  });
  return participant;
};