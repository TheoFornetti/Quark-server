const studentEventController = require("../../controller/EventsController/studentEventController");
const {Router} =  require("express")
const studentEventRoutes = Router();

studentEventRoutes.get("/:id", studentEventController.getStudentEvents)
studentEventRoutes.post("/create", studentEventController.create)
studentEventRoutes.post("/enroll", studentEventController.enrollStudent)
studentEventRoutes.put("/update", studentEventController.update)
studentEventRoutes.delete("/delete/:id", studentEventController.delete)
studentEventRoutes.post("/droll", studentEventController.deleteEnrollment)

module.exports = studentEventRoutes