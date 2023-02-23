const { Router } = require("express");
const challengeController = require("../../controller/challengeController/challengeController");
const verifyToken = require("../../middlewares/auth");

var challengeRouter = Router();

challengeRouter.post("/create", verifyToken, challengeController.create);
challengeRouter.delete("/delete/:id", verifyToken, challengeController.delete);
challengeRouter.get(
  "/getQuestionnaire/:id",
  verifyToken,
  challengeController.get
);
challengeRouter.post("/getAllQuestionnaires/", challengeController.getAll);
challengeRouter.post(
  "/correctExam",
  verifyToken,
  challengeController.correctExam
);
challengeRouter.put("/update", verifyToken, challengeController.update);

module.exports = challengeRouter;
