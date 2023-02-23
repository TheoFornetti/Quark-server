const { Router } = require("express");
const laborController = require("../../controller/professionalProfileControllers/laborsController");
const verifyToken = require("../../middlewares/auth");
const auth = require("../../middlewares/auth");
var laborsRoutes = Router();

laborsRoutes.get("/:id", verifyToken, laborController.read);
laborsRoutes.post("/create", verifyToken, laborController.create);
laborsRoutes.put("/update", verifyToken, laborController.update);
laborsRoutes.delete("/delete/:id", verifyToken, laborController.delete);

module.exports = laborsRoutes;
