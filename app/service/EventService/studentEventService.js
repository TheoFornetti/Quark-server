const { participant } = require("../../models/index");

async function getEvents(professionalProfileId) {
  var rta = await participant.findAll({ where: { professionalProfileId } });
  return rta;
}
async function enrollUser(professionalProfileId, eventId) {
  var inscriptionDate = new Date();
  participant.create({
    professionalProfileId,
    eventId,
    inscriptionDate,
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

module.exports = { getEvents, enrollUser, updateStudentEvent, deleteStudentEvent };
