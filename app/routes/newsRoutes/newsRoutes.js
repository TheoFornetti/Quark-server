const {Router} = require("express")
const newsController = require("../../controller/NewsController/newsController")
const newsRoutes = Router()

newsRoutes.post("/getAllNews", newsController.GetAllNews)
newsRoutes.get("/", newsController.getMoodleData)
newsRoutes.post("/platformNews", newsController.getPlatformNews)
newsRoutes.post("/create", newsController.create)
newsRoutes.put("/update", newsController.update)
newsRoutes.delete("/delete/:id", newsController.delete)

module.exports = newsRoutes