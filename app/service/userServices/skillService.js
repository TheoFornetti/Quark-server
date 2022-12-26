const {studentSkills} = require("../../models/index")

async function getSkill(professionalProfileId){
    var rta = await studentSkills.findAll({where:{professionalProfileId}})
    return rta
}

async function createSkill(professionalProfileId,skill){
    var rta = await studentSkills.create({
        score: skill.score,
        professionalProfileId,
        skillId : skill.id
    })

    return rta
}

async function updateSkill(id, skill){
    var rta = await studentSkills.update({
        score: skill.score,
        skillId : skill.id
    }, {where:{id}})

    return rta
}

async function deleteSkill(id){
    var rta = await studentSkills.destroy({
        where:{id}
    })

    return rta
}

module.exports = {getSkill, createSkill, updateSkill, deleteSkill}