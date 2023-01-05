'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class courseNews extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      courseNews.belongsTo(models.news)
    }
  }
  courseNews.init({
    courseId: DataTypes.INTEGER

  }, {
    sequelize,
    modelName: 'courseNews',
    timestamps: false
  });
  return courseNews;
};