const languageController = require("../../controller/professionalProfileControllers/languageController")

const {Router} =  require("express")
var languageRouter = Router()

languageRouter.get("/:id", languageController.read)
languageRouter.post("/create", languageController.create)
languageRouter.put("/update", languageController.update)
languageRouter.delete("/delete/:id", languageController.delete)


module.exports = languageRouter