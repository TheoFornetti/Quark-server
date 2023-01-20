const {
  createEvent,
  updateEvent,
  deleteEvent,
  getFutureEvents,
  getPastEvents,
  getAllEvents,
  filterEvents,
  getClosestEvent,
} = require("../../service/EventService/eventService");

var eventController = {
  create: async (req, res) => {
    try {
      var rta = await createEvent(req.body.event);
      res.status(200).json({rta, msg: "Se creo con exito!"})
    } catch (err) {
      res.status(400).json({msg: err.message});
    }
  },
  update: async (req, res) => {
    try {
      await updateEvent(req.body.eventid, req.body.event);
      res.status(200).json({msg: "Se actualizo con exito!"});
    } catch (err) {
      res.status(400).json({ msg: err.message });
    }
  },
  delete: async (req, res) => {
    try {
      await deleteEvent(req.params.id);
      res.sendStatus(200);
    } catch (err) {
      res.json({ msg: err.message });
    }
  },
  FutureEvents: async (req, res) => {
    try {
      var rta = await getFutureEvents(req.body.page);
      res.send(rta);
    } catch (err) {
      res.status(400).json({msg: err.message});
    }
  },
  pastEvents: async (req, res) => {
    try {
      var rta = await getPastEvents(req.body.page);
      res.send(rta);
    } catch (err) {
      res.status(500).json({msg: err.message});
    }
  },
  getAll: async(req,res)=>{
    try{
      var rta = await getAllEvents(req.body.size, req.body.page)
      res.send(rta)
    }catch(err){
      res.status(400).json({msg: err.message})
    }
  }, 
  filterEvents: async(req,res)=>{
    try{
      var rta = await filterEvents(req.body.tagList, req.body.dates)
      res.send(rta)
    }catch(err){
      res.status(400).json({msg: err.message})
    }
  },
  closestEvents: async(req,res)=>{
    var rta = await getClosestEvent()
    res.send(rta)
  }
  
};

module.exports = eventController;
