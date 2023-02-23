const languageController = require("../../controller/professionalProfileControllers/languageController");

const { Router } = require("express");
const verifyToken = require("../../middlewares/auth");
var languageRouter = Router();

languageRouter.get("/:id", verifyToken, languageController.read);
languageRouter.post("/create", verifyToken, languageController.create);
languageRouter.put("/update", verifyToken, languageController.update);
languageRouter.delete("/delete/:id", verifyToken, languageController.delete);

module.exports = languageRouter;
