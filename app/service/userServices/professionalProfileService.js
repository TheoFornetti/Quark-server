const { Model } = require("sequelize");
const {userBasicData, professionalProfile,academicActivity,laborActivity,studentLanguage, independentActivity,studentSkills,language} = require("../../models/index");

const { options } = require("../../routes/login");
const { getAcademics } = require("./academicService");
const { getIndependent } = require("./independentService");
const { getLabors } = require("./laborsService");
const { getLanguage } = require("./languageService");
const {  getSkill } = require("./skillService");

require('dotenv').config()
const sgMail = require ('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)


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
            imgUrl: "https://storage.googleapis.com/quark-platform-img-bucket/blank-profile-picture-973460_1280.webp"
        });
        return rta
    }catch(err){
        return err
    }
}

async function updateUser(professionalProfileId, generalData){
    
    // var response = await fetch("http://localhost/moodle/webservice/rest/server.php?wstoken=682a2163a234ce9d0df794c359df06e3&wsfunction=core_user_update_users&moodlewsrestformat=json&users[0][id]=8&users[0][email]=mocoDeMono1997@gmail.com")
   

    var rta = userBasicData.update({
        biography: generalData.biography,
        nickname: generalData.nickname,
        birthdate: generalData.birthdate
    }, {
        where: {
            professionalProfileId
        }
    })
    return rta
 
   

    
   
}

const sendMail = async (msg) =>{
    /*
    El msg se pasa asi
    {
        to:"theofornetti2001@gmail.com",
        from:"franco@quarkacademy.com.ar",
        subject:"Welcome",
        text:"Holaaa, que onda todo bien?"
    } */
    try {
        await sgMail.send(msg)
        console.log("Message sent successfully")
    } catch (err){
        console.log(err)
        if (err.response){
            console.error(err.response.body)
        }
    }
}




module.exports = {getUserFullInfo, createUser, updateUser, 
 careerSelector}