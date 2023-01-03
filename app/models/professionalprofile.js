'use strict';
const {
  Model, INTEGER
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class professionalProfile extends Model {
    static associate(models) {
      professionalProfile.hasMany(models.academicActivity);
      professionalProfile.hasMany(models.laborActivity);
      professionalProfile.hasMany(models.independentActivity)
      professionalProfile.hasMany(models.studentSkills)
      professionalProfile.hasMany(models.studentLanguage)
      professionalProfile.hasMany(models.participant)
      professionalProfile.hasOne(models.sesskey)
    }
  }
  professionalProfile.init({
    
    biography: DataTypes.STRING,
    score: DataTypes.INTEGER,
    nickname: DataTypes.STRING,
    birthdate: DataTypes.DATE,
    role:{
      type:DataTypes.INTEGER,
      defaultValue:0
    },
    career: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'professionalProfile',
  });

  
  return professionalProfile;
};