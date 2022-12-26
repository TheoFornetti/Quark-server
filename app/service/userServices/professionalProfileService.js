const {professionalProfile} = require("../../models/index");
const { getAcademics } = require("./academicService");
const { getIndependent } = require("./independentService");
const { getLabors } = require("./laborsService");
const { getLanguage } = require("./languageService");
const { getSkill } = require("./skillService");

async function getUserFullInfo(id){
    var profile = await professionalProfile.findByPk(id);
    var academics = await getAcademics(id);
    var labors = await getLabors(id);
    var independents = await getIndependent(id)
    var skills = await getSkill(id)
    var language = await getLanguage(id)

    var user = {
        profile,
        academics,
        labors,
        independents,
        skills,
        language
    }

    return user
}

async function getProfessionalProfile(id){
    
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


module.exports = {getUserFullInfo, createUser, updateUser, getProfessionalProfile}