const{Router} = require("express")
const skillController = require("../../controller/professionalProfileControllers/skillController")
var skillRoutes = Router()


skillRoutes.get("/:id", skillController.read)
skillRoutes.post("/create", skillController.create)
skillRoutes.put("/update", skillController.update)
skillRoutes.delete("/delete/:id", skillController.delete)

module.exports = skillRoutes
