const {Router} = require("express")
const laborController = require("../../controller/professionalProfileControllers/laborsController")
const auth = require("../../middlewares/auth")
var laborsRoutes = Router()

laborsRoutes.get("/:id", laborController.read)
laborsRoutes.post("/create", laborController.create)
laborsRoutes.put("/update", laborController.update)
laborsRoutes.delete("/delete/:id", laborController.delete)

module.exports = laborsRoutes