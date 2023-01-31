const  {Router} = require("express");
const registerController = require("../../controller/RegisterController/registerController");
const registerRoutes = Router()



registerRoutes.post("/", registerController.create)
registerRoutes.post("/moodleSingUp", registerController.createMoodle)

module.exports = registerRoutes