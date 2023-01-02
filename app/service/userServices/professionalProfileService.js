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
    var languages = await getLanguage(id)

    var user = {
        profile,
        academics,
        labors,
        independents,
        skills,
        languages
    }

    return user
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

async function updateUser(id, biography, score, nickname, birthdate){
    var response = await fetch("http://localhost/moodle/webservice/rest/server.php?wstoken=682a2163a234ce9d0df794c359df06e3&wsfunction=core_user_update_users&moodlewsrestformat=json&users[0][id]=8&users[0][email]=mocoDeMono1997@gmail.com")
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


module.exports = {getUserFullInfo, createUser, updateUser}