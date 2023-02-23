"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class academicActivity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      academicActivity.belongsTo(models.professionalProfile);
    }
  }
  academicActivity.init(
    {
      institution: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [2, 50],
            msg: "El nombre de la institucion tiene que tener entre 6 y 50 caracteres",
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: {
            args: [0, 100],
            msg: "La descripcion no puede tener mas de 100 caracteres",
          },
        },
      },
      beginDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: true,
        validate: {
          dateValidator() {
            var fechaInicial = new Date(this.beginDate);
            var fechaFinal = new Date(this.endDate);
            if (fechaInicial > fechaFinal) {
              throw new Error(
                "La fecha de inicion no puede ser mayor que la fecha de fin"
              );
            }
          },
        },
      },
      state: DataTypes.STRING,
      title: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [6, 50],
            msg: "El titulo tiene que tener entre 6 y 50 caracteres",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "academicActivity",
      timestamps: false,
    }
  );
  return academicActivity;
};
