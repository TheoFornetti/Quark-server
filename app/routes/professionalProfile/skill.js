const { Router } = require("express");
const skillController = require("../../controller/professionalProfileControllers/skillController");
const verifyToken = require("../../middlewares/auth");
var skillRoutes = Router();

skillRoutes.get("/:id", verifyToken, skillController.read);
skillRoutes.post("/create", verifyToken, skillController.create);
skillRoutes.put("/update", verifyToken, skillController.update);
skillRoutes.delete("/delete/:id", verifyToken, skillController.delete);

module.exports = skillRoutes;
