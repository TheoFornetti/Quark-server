const { FutureEvents } = require("../../controller/EventsController/eventController")
const {events}= require("../../models/index")

async function createEvent(event){
    try{
        await events.create({
            title: event.title,
            description: event.description,
            eventDate: event.eventDate,
            link: event.link,
            state: event.state,
            visibility: event.visibility
        })
    }catch(err){
        throw err
    }
}

async function updateEvent(id, event){
    try{
        await events.update({
            title: event.title,
            description: event.description,
            eventDate: event.eventDate,
            link: event.link,
            state: event.state,
            visibility: event.visibility
        },{where:{id}})
    }catch(err){
        throw err
    }
}

async function deleteEvent(id){
    try{
        await events.destroy({where:{id}})
    }catch(err){
        throw err
    }
}

async function getFutureEvents(){
    var futureEvents = [];
    var rta = await events.findAll()
    const actualDate = new Date()
    
    
    rta.forEach(event =>{
        var eventDate =  new Date(event.eventDate)
        if(actualDate < eventDate){
            futureEvents.push(event)
        }
    })

    return futureEvents
}

async function getPastEvents(){
    var pastEvents = [];
    var rta = await events.findAll()
    const actualDate = new Date()
    
    
    rta.forEach(event =>{
        var eventDate =  new Date(event.eventDate)
        if(actualDate > eventDate){
            pastEvents.push(event)
        }
    })

    return pastEvents
}

module.exports = {createEvent, updateEvent, deleteEvent, getFutureEvents, getPastEvents}