const {academicActivity} = require("../../models/index")
async function getAcademics(professionalProfileId){
  var rta = await academicActivity.findAll({where:{professionalProfileId}})
  return rta
}

async function createAcademics(professionalProfileId, academics){
  try{
    var rta = await academicActivity.create({
        institution: academics.institution,
        beginDate: academics.beginDate,
        endDate: academics.endDate,
        state: academics.state,
        title: academics.title,
        professionalProfileId
    })

    return rta
  }catch(err){
    throw err
  }
}

async function updateAcademics(id, academics){
    var rta = await academicActivity.update({
        institution: academics.institution,
        beginDate: academics.beginDate,
        endDate: academics.endDate,
        state: academics.state,
        title: academics.title,
    
    },{
        where: {id}
    })

    return rta
}

async function deleteAcademics(id){
    var rta = await academicActivity.destroy({
        where:{id}
    })

    return rta
}

module.exports = {getAcademics, createAcademics, updateAcademics, deleteAcademics}