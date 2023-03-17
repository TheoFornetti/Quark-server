const { where, Op } = require("sequelize");
const { participant,events } = require("../../models/index");

async function getEvents(professionalProfileId) {
  var rta = await participant.findAll({ where: {professionalProfileId}});
  var eventList = [] 
  console.log(rta)
  

  
  for(var i = 0; i<rta.length; i++){
    var id = rta[i].eventId
    console.log(id)
    var rta1 = await events.findAll({where:{id}})
    eventList.push(rta1[0])  

  }

  console.log(eventList)

 
  
  
  return eventList
 
}
//Eventos no Game Jams
async function enrollUser(professionalProfileId, eventId) {

  await participant.create({
    professionalProfileId,
    eventId
  });
}
async function updateStudentEvent( eventId, event) {
  var rta = await participant.update(
    {
      state: event.state,
      observation: event.observation,
    },
    { where: {   eventId  } }
  );
  console.log(rta)
}
async function deleteStudentEvent(eventId){
   participant.destroy({where:{eventId}})
}

async function deleteEnrollment(professionalProfileId, eventId){
  await  participant.destroy({where:{[Op.and]: [{professionalProfileId},{eventId}]}})
}

module.exports = { getEvents, enrollUser, updateStudentEvent, deleteStudentEvent,deleteEnrollment };
