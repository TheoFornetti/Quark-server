'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class independentActivity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      independentActivity.belongsTo(models.professionalProfile)
    }
  }
  independentActivity.init({
   
    description: {
      type: DataTypes.STRING,
      validate:{len: {
        args:[0,100],
        msg: "La descripcion no puede tener mas de 100 caracteres"
      }}
    },

    title: {
      type: DataTypes.STRING,
      validate:{len: {
        args:[3,50],
        msg: "El titulo tiene que tener entre 6 y 50 caracteres"
      }}
    },
    projectUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'independentActivity',
    timestamps: false
  });
  return independentActivity;
};