const { Router } = require("express");
const challengeController = require("../../controller/challengeController/challengeController");
const { coursesController } = require("../../controller/coursesController/coursesController");
const verifyToken = require("../../middlewares/auth");

var coursesRouter = Router();
coursesRouter.post("/getCoursesLists", coursesController.getCoursesLists);

module.exports = coursesRouter;
