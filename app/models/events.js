'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class events extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      events.hasMany(models.participant)
      events.hasMany(models.eventTags)
    }
  }
  events.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    eventDate: DataTypes.DATE,
    link: DataTypes.STRING,
    state: DataTypes.STRING,
    visibility: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'events',
    timestamps: false
  });
  return events;
};