const {independentActivity} = require("../../models/index")

async function getIndependent(professionalProfileId){
    var rta = independentActivity.findAll({where: {professionalProfileId}})
    return rta
}

async function createIndependent(professionalProfileId, independent){
    var rta = independentActivity.create({
    
        
        description: independent.description,
        title: independent.title,
        projectUrl: independent.url,
        professionalProfileId
    })
    return rta
}

async function updateIndependent(id,independent){
    var rta =  independentActivity.update({
       
        description: independent.description,
        title: independent.title,
        projectUrl: independent.url,

    },{where: {id}})
    return rta
}

async function deleteIndependent(id){
    var rta = independentActivity.destroy({where: {id}})
    return rta
}



module.exports = {getIndependent, createIndependent, updateIndependent, deleteIndependent}