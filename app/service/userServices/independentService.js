const {independentActivity} = require("../../models/index")

async function createIndependent(professionalProfileId, independent){
    var rta = await independentActivity.create({
        beginDate: independent.beginDate,
        endDate: independent.endDate,
        state: independent.state,
        title: independent.title,
        professionalProfileId
    })
    return rta
}

async function updateIndependent(id,independent){
    var rta = await independentActivity.update({
       
        beginDate: independent.beginDate,
        endDate: independent.endDate,
        state: independent.state,
        title: independent.title
    },{where: {id}})
    return rta
}

async function deleteIndependent(id){
    var rta = await independentActivity.destroy({where: {id}})
    return rta
}



module.exports = {createIndependent, updateIndependent, deleteIndependent}