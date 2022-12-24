const express = require("express")
const userController = require("../../controller/professionalProfileControllers/userController")

const userRoutes = express.Router()


userRoutes.get("/getInfo", userController.getInfo)
userRoutes.get("/getMoodleData/:email", userController.getMoodleInfo)
userRoutes.get("/getMoodleDataId/:id", userController.getMoodleInfoId)
userRoutes.post("/create", userController.create)
userRoutes.put("/update", userController.update)

module.exports = userRoutes