'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class eventTags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      eventTags.belongsTo(models.events)
      eventTags.belongsTo(models.tag)
    }
  }
  eventTags.init({
    
  }, {
    sequelize,
    modelName: 'eventTags',
    timestamps: false
  });
  return eventTags;
};