'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class news extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      news.hasMany(models.courseNews, {onDelete:"CASCADE"});
    }
  }
  news.init({
    title: {
      type:DataTypes.STRING,
      allowNull: false
    },
    content: {
      type:DataTypes.STRING,
      allowNull: false
    },
    endDate: {
      type:DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'news',
  });
  return news;
};