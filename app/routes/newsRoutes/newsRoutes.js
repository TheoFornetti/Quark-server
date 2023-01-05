const {Router} = require("express")
const newsController = require("../../controller/EventsController/newsController")
const newsRoutes = Router()

newsRoutes.get("/getAllNews", newsController.GetAllNews)
newsRoutes.get("/", newsController.getMoodleData)
newsRoutes.post("/platformNews", newsController.getPlatformNews)
newsRoutes.post("/create", newsController.create)

newsRoutes.put("/update", newsController.update)
// newsRoutes.delete()

module.exports = newsRoutes