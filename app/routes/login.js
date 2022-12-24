const {Router} = require("express");
const loginController = require("../controller/loginController");
var loginRoutes = Router();

loginRoutes.post("/", loginController.createToken)

module.exports = loginRoutes
