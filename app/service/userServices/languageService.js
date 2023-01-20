const {studentLanguage, language} = require("../../models/index")

async function getLanguage(professionalProfileId){
    var options= {
        where: {professionalProfileId},
        include:[language]
    }
    var rta = studentLanguage.findAll(options) 
    return rta
}

async function createLanguage(professionalProfileId, language){
    var rta = studentLanguage.create({
        level: language.level,
        languageId: language.id,
        professionalProfileId
    })

    return rta
}

async function updateLanguage(id, language){
    var rta = studentLanguage.update({
        level: language.level,
        languageId: language.id,
    },{where:{id}})

    return rta
}

async function deleteLanguage(id){
    var rta = studentLanguage.destroy({
        where: {id}
    })

    return rta
}

module.exports = {getLanguage, createLanguage, updateLanguage, deleteLanguage}