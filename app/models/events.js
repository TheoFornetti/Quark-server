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
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.STRING,
    eventDate: {
      type:DataTypes.DATE,
      allowNull: false
    },
    link: {
      type:DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    visibility: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    isSaved:{
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    },
    img: {
      type: DataTypes.STRING,
      defaultValue: "none"
    },
  }, {
    sequelize,
    modelName: 'events',
    timestamps: true
  });
  return events;
};