const { getEvents, enrollUser, updateStudentEvent, deleteStudentEvent } = require("../../service/EventService/studentEventService")

var studentEventController = {
    getStudentEvents: async (req,res)=>{
        try{
            var rta = await getEvents(req.params.id)
            res.send(rta)
        }catch(err){
            res.send(rta)
        }
    },
    create:async (req,res)=> {
        try{
            var rta = await enrollUser(req.body.userid, req.body.eventid)
            res.sendStatus(200)
        }catch(err){
            res.sendStatus(500)
        }
    },
    update:async (req,res)=> {
        try{
            
            var rta = await updateStudentEvent(req.body.userid, req.body.eventid, req.body.event)
            console.log(rta)
            res.sendStatus(200)
        }catch(err){
            res.sendStatus(500)
        }
    },
    delete: (req,res)=>{
        try{
            deleteStudentEvent(req.params.id)
            res.sendStatus(200)
        }catch(err){
            res.sendStatus(500)
        }
    },
    enrollStudent: async (req,res)=>{
        
        try{
            await enrollUser(req.body.userId, req.body.eventId)
            res.sendStatus(200)
        }catch(err){
            res.sendStatus(500)
        }
    }
}

module.exports = studentEventController