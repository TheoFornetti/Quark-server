const {Router} = require("express")
const laborController = require("../../controller/professionalProfileControllers/laborsController")
var laborsRoutes = Router()

laborsRoutes.post("/create", laborController.create)
laborsRoutes.put("/update", laborController.update)
laborsRoutes.delete("/delete/:id", laborController.delete)

module.exports = laborsRoutes