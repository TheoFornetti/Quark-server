const {Router} = require("express")
const newsController = require("../../controller/NewsController/newsController")
const verifyToken = require("../../middlewares/auth")
const newsRoutes = Router()

newsRoutes.post("/getAllNews", newsController.GetAllNews)
newsRoutes.get("/", newsController.getMoodleData)
newsRoutes.post("/platformNews", newsController.getPlatformNews)
newsRoutes.post("/create", verifyToken, newsController.create)
newsRoutes.put("/update", verifyToken, newsController.update)
newsRoutes.delete("/delete/:id", verifyToken, newsController.delete)

module.exports = newsRoutes