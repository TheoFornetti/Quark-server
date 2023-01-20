const { skill } = require("../../models/index");
const { language } = require("../../models/index");
const { Op } = require("sequelize");

var ParameterController = {
  readSkill: async (req, res) => {
    if (req.params.userCareer == 0 || req.params.userCareer == 1) {
      var rta = await skill.findAll({
        where: {
            career: [+req.params.userCareer, 2]
        },
      });
      res.send(rta);
    } else {
      var rta = await skill.findAll();
      res.send(rta);
    }
  },
  readLanguages: async (req, res) => {
    var rta = await language.findAll();
    res.send(rta);
  },
};

module.exports = ParameterController;
