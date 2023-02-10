'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class scholarshipCourses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      scholarshipCourses.belongsTo(models.scholarshipType)
    }
  }
  scholarshipCourses.init({
    courseId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'scholarshipCourses',
    timestamps:false
  });
  return scholarshipCourses;
};