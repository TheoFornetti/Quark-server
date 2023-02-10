const {Router} = require("express")
const challengeController = require("../../controller/challengeController/challengeController")

var challengeRouter = Router()

challengeRouter.post("/create", challengeController.create)
challengeRouter.delete("/delete/:id", challengeController.delete)
challengeRouter.get("/getQuestionnaire/:id", challengeController.get)

module.exports = challengeRouter