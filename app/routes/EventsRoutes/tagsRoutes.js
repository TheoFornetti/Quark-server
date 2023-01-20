const {Router} = require("express")
const tagController = require("../../controller/EventsController/tagsController")
var tagRoutes = Router()

tagRoutes.get("/", tagController.get)
tagRoutes.post("/create", tagController.create)
tagRoutes.put("/update", tagController.update)
tagRoutes.delete("/delete/:id", tagController.delete)

module.exports = tagRoutes