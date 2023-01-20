'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userBasicData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      userBasicData.belongsTo(models.professionalProfile)
    }
  }
  userBasicData.init({
    biography: {
      type: DataTypes.STRING,
      validate:{len: {
        args:[0,200],
        msg: "La biografia no puede tener mas de 200 caracteres"
      }}
    },
    score: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate:{len: {
        args:[4,20],
        msg: "El nickName tienen que tener entre 4 y 20 caracteres"
      }}
    },
    birthdate: DataTypes.DATE,
    imgUrl: DataTypes.STRING, 
    
    
    
  }, {
    sequelize,
    modelName: 'userBasicData',
    timestamps: false
  });
  return userBasicData;
};