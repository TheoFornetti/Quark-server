const {Router} = require("express");
const sesskeyController = require("../../controller/professionalProfileControllers/sesskeyController");
var sesskeyRoutes = Router();

sesskeyRoutes.get("/:id", sesskeyController.getSesskey)
sesskeyRoutes.post("/", sesskeyController.RCU)


module.exports = sesskeyRoutes