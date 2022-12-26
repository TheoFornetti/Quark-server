const {studentLanguage} = require("../../models/index")

async function getLanguage(professionalProfileId){
    var rta = await studentLanguage.findAll({where:{professionalProfileId}}) 
    return rta
}

async function createLanguage(professionalProfileId, language){
    var rta = await studentLanguage.create({
        level: language.level,
        languageId: language.id,
        professionalProfileId
    })

    return rta
}

async function updateLanguage(id, language){
    var rta = await studentLanguage.update({
        level: language.level,
        languageId: language.id,
    },{where:{id}})

    return rta
}

async function deleteLanguage(id){
    var rta = await studentLanguage.destroy({
        where: {id}
    })

    return rta
}

module.exports = {getLanguage, createLanguage, updateLanguage, deleteLanguage}