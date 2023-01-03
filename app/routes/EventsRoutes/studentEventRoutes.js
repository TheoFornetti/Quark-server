const studentEventController = require("../../controller/EventsController/studentEventController");
const {Router} =  require("express")
const studentEventRoutes = Router();

studentEventRoutes.get("/:id", studentEventController.getStudentEvents)
studentEventRoutes.post("/create", studentEventController.create)
studentEventRoutes.put("/update", studentEventController.update)
studentEventRoutes.delete("/delete/:id", studentEventController.delete)

module.exports = studentEventRoutes