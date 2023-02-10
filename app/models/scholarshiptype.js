'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class scholarshipType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      scholarshipType.hasMany(models.scholarship)
      scholarshipType.hasMany(models.scholarshipCourses)
    }
  }
  scholarshipType.init({
    name: DataTypes.STRING,
    duration: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    img: {
      type: DataTypes.STRING,
      defaultValue: "none"
    },
    endDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'scholarshipType',
    timestamps:false
  });
  return scholarshipType;
};