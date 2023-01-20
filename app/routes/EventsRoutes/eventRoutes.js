const {Router} = require("express");
const eventController = require("../../controller/EventsController/eventController");

const eventsRoutes = Router()

eventsRoutes.post("/futureEvents", eventController.FutureEvents)
eventsRoutes.post("/getAllEvents", eventController.getAll)
eventsRoutes.post("/pastEvents", eventController.pastEvents)
eventsRoutes.post("/create", eventController.create)
eventsRoutes.post("/filter", eventController.filterEvents)
eventsRoutes.put("/update", eventController.update)
eventsRoutes.delete("/delete/:id", eventController.delete)
eventsRoutes.get("/closestEvent", eventController.closestEvents)

module.exports = eventsRoutes