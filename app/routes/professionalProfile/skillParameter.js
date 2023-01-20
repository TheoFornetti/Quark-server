const{Router} = require("express")
const ParameterController = require("../../controller/professionalProfileControllers/skillParameterController")
var ParametersRoutes = Router()


ParametersRoutes.get("/skills/:userCareer", ParameterController.readSkill)
ParametersRoutes.get("/languages", ParameterController.readLanguages)


module.exports = ParametersRoutes
