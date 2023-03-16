const { Router } = require("express");
const academicController = require("../../controller/professionalProfileControllers/academicController");
const verifyToken = require("../../middlewares/auth");
const academicsRoutes = Router();

academicsRoutes.get("/:id", verifyToken, academicController.read);
academicsRoutes.post("/create", verifyToken, academicController.create);
academicsRoutes.put("/update", verifyToken, academicController.update);
academicsRoutes.delete("/delete/:id", verifyToken,  academicController.delete);

module.exports = academicsRoutes;
