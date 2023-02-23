const { Router } = require("express");
const eventController = require("../../controller/EventsController/eventController");
const verifyToken = require("../../middlewares/auth");
const multer = require('multer');

const eventsRoutes = Router();

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // no larger than 5mb
    },
});

eventsRoutes.post("/futureEvents", eventController.FutureEvents);
eventsRoutes.post("/getAllEvents", eventController.getAll);
eventsRoutes.post("/pastEvents", eventController.pastEvents);
eventsRoutes.post("/create", upload.single('file'), verifyToken, eventController.create);
eventsRoutes.post("/filter", eventController.filterEvents);
eventsRoutes.put("/update", upload.single('file'), verifyToken, eventController.update);
eventsRoutes.delete("/delete/:id", verifyToken, eventController.delete);
eventsRoutes.get("/closestEvent", eventController.closestEvents);

module.exports = eventsRoutes;
