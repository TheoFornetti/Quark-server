const { Router } = require("express");
const independentController = require("../../controller/professionalProfileControllers/independentController");
const verifyToken = require("../../middlewares/auth");
var independetRoutes = Router();

independetRoutes.get("/:id", verifyToken, independentController.read);
independetRoutes.post("/create", verifyToken, independentController.create);
independetRoutes.put("/update", verifyToken, independentController.update);
independetRoutes.delete(
  "/delete/:id",
  verifyToken,
  independentController.delete
);

module.exports = independetRoutes;
