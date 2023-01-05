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
      news.hasMany(models.courseNews);
    }
  }
  news.init({
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    endDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'news',
  });
  return news;
};