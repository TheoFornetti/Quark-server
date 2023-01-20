const express = require("express")
const userController = require("../../controller/professionalProfileControllers/userController")


const userRoutes = express.Router()


userRoutes.get("/:id", userController.getInfo)
userRoutes.get("/getMoodleData/:email", userController.getMoodleInfo)
userRoutes.post("/COU", userController.createOrUpdate)
userRoutes.put("/update", userController.updateUserInfo)

module.exports = userRoutes