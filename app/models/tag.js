'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      tag.hasMany(models.eventTags)
    }
  }
  tag.init({
    
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tag',
    timestamps: false
  });
  return tag;
};