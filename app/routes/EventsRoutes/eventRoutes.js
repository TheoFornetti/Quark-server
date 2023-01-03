const {Router} = require("express");
const eventController = require("../../controller/EventsController/eventController");

const eventsRoutes = Router()

eventsRoutes.get("/futureEvents", eventController.FutureEvents)
eventsRoutes.get("/pastEvents", eventController.pastEvents)
eventsRoutes.post("/create", eventController.create)
eventsRoutes.put("/update", eventController.update)
eventsRoutes.delete("/delete/:id", eventController.delete)

module.exports = eventsRoutes