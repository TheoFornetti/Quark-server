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
      professionalProfile.hasOne(models.userBasicData)
      professionalProfile.hasMany(models.scholarship)
      
    }
  }
  professionalProfile.init({
    career: DataTypes.INTEGER,
    role: {
      type:DataTypes.INTEGER,
      defaultValue:0
    },
    acceptLanguageAgreement: {
      type:DataTypes.INTEGER,
      defaultValue:0
    },
    acceptRecruitingAgreement: {
      type:DataTypes.INTEGER,
      defaultValue:0
    },
   
  }, {
    sequelize,
    modelName: 'professionalProfile',
  });

  
  return professionalProfile;
};