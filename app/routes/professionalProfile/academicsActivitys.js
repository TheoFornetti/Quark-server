const {Router} = require("express")
const academicController = require("../../controller/professionalProfileControllers/academicController")
const academicsRoutes = Router()

academicsRoutes.post("/create", academicController.create)
academicsRoutes.put("/update", academicController.update)
academicsRoutes.delete("/delete/:id", academicController.delete)

module.exports = academicsRoutes