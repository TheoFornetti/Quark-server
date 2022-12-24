const {professionalProfile} = require("../../models/index")

async function getProfessionalProfile(id){
    var profile = await professionalProfile.findByPk(id)
    return profile
}

async function createUser(id, biography, score, nickname, birthdate){
    await professionalProfile.create({
        id,
        biography,
        score,
        nickname,
        birthdate,
    });
}

function updateUser(id, biography, score, nickname, birthdate){
    professionalProfile.update({
        biography,
        score,
        nickname,
        birthdate
    }, {
        where: {
            id
        }
      });
}


module.exports = {createUser, updateUser, getProfessionalProfile}