const  {Router} = require("express");
const registerController = require("../../controller/RegisterController/registerController");
const registerRoutes = Router()



registerRoutes.post("/:rta", registerController.create)
registerRoutes.get("/moodleSingUp/:id", registerController.createMoodle)

module.exports = registerRoutes