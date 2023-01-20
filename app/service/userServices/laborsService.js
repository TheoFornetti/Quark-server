const {laborActivity} = require("../../models/index")

async function getLabors(professionalProfileId){
    var rta = laborActivity.findAll({where:{professionalProfileId}})
    return rta
}

async function createLabors(professionalProfileId, labors){
    var rta = laborActivity.create({
        company: labors.company,
        beginDate: labors.beginDate,
        endDate: labors.endDate,
        state: labors.state,
        title: labors.title,
        description: labors.description,
        professionalProfileId
    })
    return rta
}

async function updateLabors(id,labors){
    var rta = laborActivity.update({
        company: labors.company,
        beginDate: labors.beginDate,
        endDate: labors.endDate,
        state: labors.state,
        title: labors.title
    },{where: {id}})
    return rta
}

async function deleteLabors(id){
    var rta = laborActivity.destroy({where: {id}})
    return rta
}



module.exports = {getLabors, createLabors, updateLabors, deleteLabors}