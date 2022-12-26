const {Router} = require("express")
const independentController = require("../../controller/professionalProfileControllers/independentController")
var independetRoutes = Router()

independetRoutes.get("/:id", independentController.read)
independetRoutes.post("/create", independentController.create)
independetRoutes.put("/update", independentController.update)
independetRoutes.delete("/delete/:id", independentController.delete)

module.exports = independetRoutes