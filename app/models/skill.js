'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class skill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      skill.hasMany(models.studentSkills)
    }
  }
  skill.init({
    name: DataTypes.STRING,
    career: DataTypes.INTEGER,
    description: {
      type: DataTypes.STRING,
      validate:{len: {
        args:[0,100],
        msg: "La descripcion no puede tener mas de 100 caracteres"
      }}
    },
  }, {
    sequelize,
    modelName: 'skill',
    timestamps: false
  });
  return skill;
};