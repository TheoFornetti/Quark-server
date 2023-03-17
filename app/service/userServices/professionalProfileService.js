const { Model } = require("sequelize");
const {userBasicData, professionalProfile,academicActivity,laborActivity,studentLanguage, independentActivity,studentSkills,language} = require("../../models/index");
const fetch = require("node-fetch")
const { options } = require("../../routes/login");
const { getAcademics } = require("./academicService");
const { getIndependent } = require("./independentService");
const { getLabors } = require("./laborsService");
const { getLanguage } = require("./languageService");
const {  getSkill } = require("./skillService");

async function getUserFullInfo(id){
    var options = {
       
        where:{id}
    }

    var professionalProfileId = id

    var p = await professionalProfile.findAll(options)
    var userBasic = await userBasicData.findAll({where:{professionalProfileId}})
    var academicActivities = await getAcademics(id)
    var laborActivities = await getLabors(id)
    var independentActivities = await getIndependent(id)
    var languages = await getLanguage(id)
    var skills = await getSkill(id)
  
    var professionalprofile = p[0]
    var userBasicDatum = userBasic[0] 

    
    var basicData = {
        id,
        professionalprofile,
        userBasicDatum,
        academicActivities,
        laborActivities,
        independentActivities,
        languages,
        skills

    }
  
    
    return basicData
}

async function careerSelector(coursesList, id){
    var unity = 0
    var unreal = 0 
    coursesList.forEach(course =>{
        if(course.idCurso == 14 || course.idCurso == 18 || course.idCurso == 8 || course.idCurso == 6 ){
            unity++
        }else if(course.idCurso == 15 || course.idCurso == 25 || course.idCurso == 11){
            unreal ++
        }
    })

    if(unreal > 0 && unity > 0){
        professionalProfile.update({
            career: 2
        },{where:{id}})
    }else if(unreal > 0){
        professionalProfile.update({
            career: 1
        },{where:{id}})
    }else if(unity > 0){
        professionalProfile.update({
            career: 0
        },{where:{id}})
    }
}

async function createUser(professionalProfileId, userGeneralData){
    try{
        var rta = userBasicData.create({
            professionalProfileId,
            biography:userGeneralData.biography,
            nickname:userGeneralData.nickname,
            birthday:userGeneralData.birthdate,
            imgUrl: "https://storage.googleapis.com/quark-platform-vm-img-bucket/blank-profile-picture.webp"
        });
        return rta
    }catch(err){
        return err
    }
}

async function updateUser(professionalProfileId, generalData){
    console.log(generalData)
    console.log(professionalProfileId)
    
    var response = await fetch(`${process.env.VM_IP}/moodle/webservice/rest/server.php?wstoken=de19f86bde31dfb08f817681f4414238&wsfunction=core_user_update_users&moodlewsrestformat=json&users[0][id]=${professionalProfileId}&users[0][phone2]=${generalData.phone}&users[0][city]=${generalData.city}&users[0][country]=${generalData.country}&users[0][firstname]=${generalData.firstname}&users[0][lastname]=${generalData.lastname}&users[0][idnumber]=${generalData.idnumber}`)
   
    console.log(response)

    var rta = userBasicData.update({
        biography: generalData.biography,
        nickname: generalData.nickname,
        birthdate: generalData.birthdate,
        linkedIn: generalData.linkedIn,
        discord: generalData.discord,
        github: generalData.github,
        gender: generalData.gender
    }, {
        where: {
            professionalProfileId
        }
    })
    return rta
 
   

    
   
}






module.exports = {getUserFullInfo, createUser, updateUser, 
 careerSelector}