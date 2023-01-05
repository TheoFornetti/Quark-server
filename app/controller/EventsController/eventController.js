const {
  createEvent,
  updateEvent,
  deleteEvent,
  getFutureEvents,
  getPastEvents,
} = require("../../service/EventService/eventService");

var eventController = {
  create: async (req, res) => {
    try {
      var rta = await createEvent(req.body.event);
      res.send(rta)
    } catch (err) {
      res.json({ message: "Unable to create this Event" });
    }
  },

  update: async (req, res) => {
    try {
      console.log(req.body.event);
      await updateEvent(req.body.eventid, req.body.event);
      res.sendStatus(200);
    } catch (err) {
      res.json({ message: "Unable to Update this Event" });
    }
  },
  delete: async (req, res) => {
    try {
      console.log(req.params.id);
      await deleteEvent(req.params.id);
      res.sendStatus(200);
    } catch (err) {
      res.json({ message: "Unable to Delete this Event" });
    }
  },
  FutureEvents: async (req, res) => {
    try {
      var rta = await getFutureEvents();
      res.send(rta);
    } catch (err) {
      res.send(500);
    }
  },
  pastEvents: async (req, res) => {
    try {
      var rta = await getPastEvents();
      res.send(rta);
    } catch (err) {
      res.send(500);
    }
  },
};

module.exports = eventController;
