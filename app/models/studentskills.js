'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class studentSkills extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      studentSkills.belongsTo(models.professionalProfile)
      studentSkills.belongsTo(models.skill)
    }
  }
  studentSkills.init({
    score: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'studentSkills',
    timestamps: false
  });
  return studentSkills;
};