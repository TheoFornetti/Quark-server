const {skill} = require("../../models/index")
const {language} = require("../../models/index")

var ParameterController = {
    readSkill: async (req,res) =>{
        var rta = await skill.findAll()
        res.send(rta)
    },
    readLanguages: async (req,res) =>{
        var rta = await language.findAll()
        res.send(rta)
    }
}

module.exports = ParameterController