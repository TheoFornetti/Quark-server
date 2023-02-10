const fetch = require("node-fetch");
const { scholarship,scholarshipCourses, scholarshipType } = require("../../models/index");
const { Op } = require("sequelize");


async function manualEnrollment(userid, courseid) {
  try {
    const url = `http://34.71.113.200/moodle/webservice/rest/server.php?wstoken=de19f86bde31dfb08f817681f4414238&&wsfunction=enrol_manual_enrol_users&enrolments[0][roleid]=5&enrolments[0][userid]=${userid}&enrolments[0][courseid]=${courseid}&moodlewsrestformat=json`;

    var response = await fetch(url);
    var data = await response.json();
  } catch (err) {
    throw new Error("No se pude dar de alta al usuario. Intente de nuevo");
  }
}

async function passed(userid, courseid) {
  try {
    const url = `http://34.71.113.200/moodle/webservice/rest/server.php?wstoken=de19f86bde31dfb08f817681f4414238&&wsfunction=gradereport_user_get_grade_items&userid=${userid}&courseid=${courseid}&moodlewsrestformat=json`;

    var response = await fetch(url);
    var data = await response.json();

    if (data.usergrades[0].gradeitems[0].gradeformatted < 7) {
      return false;
    } else {
      return true;
    }
  } catch (err) {
    throw new Error(err.message);
  }
}

async function manualCourseEnrol(userid, course, pass) {
  try {
    if (pass) {
      course.forEach(async (courseid) => {
        const url = `http://34.71.113.200/moodle/webservice/rest/server.php?wstoken=de19f86bde31dfb08f817681f4414238&&wsfunction=enrol_manual_enrol_users&enrolments[0][roleid]=5&enrolments[0][userid]=${userid}&enrolments[0][courseid]=${courseid}&moodlewsrestformat=json`;

        var response = await fetch(url);
        var data = await response.json();
      });

      return "Se te dio el alta en los cursos";
    } else {
      return "Se te inscribio al curso Intro a la Programacion";
    }
  } catch (err) {
    throw new Error(err.message);
  }
}

async function createScholarshipRegister(userid,scholarshipTypeId,pass) {
    var courseList = []
  
  try{
    if(pass){
        var tipoBeca = await scholarshipType.findAll({where:{id:scholarshipTypeId}})
        console.log(tipoBeca[0].duration)
        
        var today = new Date()
        var beginDate = new Date();
        var endDate = new Date(today.setMonth(today.getMonth() + tipoBeca[0].duration));
        await scholarship.create({
            beginDate,
            endDate,
            professionalProfileId: userid,
            scholarshipTypeId
        })
        var courses = await scholarshipCourses.findAll({where:{scholarshipTypeId}})
        courses.forEach(course=>{
            courseList.push(course.courseId)
        })

        return courseList
    }

  }catch(err){
    throw new Error(err.message)
  }
}

async function createScholarship(scholarship){
  try{
    console.log(scholarship)
    var rta = await scholarshipType.create({
      name: scholarship.name,
      duration: scholarship.duration,
      amount: scholarship.amount,
      endDate: scholarship.endDate
    })
    scholarship.courseList.forEach(async course =>{
      var course = await scholarshipCourses.create({
        courseId: course,
        scholarshipTypeId: rta.id
      })
    })

    return rta.id
  }catch(err){
    throw new Error(err.message)
  }
}

async function updateScholarshipImg(img, id){
  var rta = await scholarshipType.update({
    img
  }, {where:{id}})
}

async function updateScholarship(scholarship, id){

  var scholarshipTypeId = id

  var rta = await scholarshipType.update({
    name: scholarship.name,
    duration: scholarship.duration,
    img,
    amount: scholarship.amount,
    endDate: scholarship.endDate
  }, {where:{id}})
  scholarship.courseList.forEach(async course =>{
    var course = await scholarshipCourses.update({
      courseId: course,
      scholarshipTypeId: rta.id
    },{where:{scholarshipTypeId}})
  })
}

async function getScholarship(size, page){
  const actualDate = new Date()
  let options = {
    limit: +size,
    offset: +page * +size,
    where: {
      endDate:{
        [Op.gte]: actualDate
      },
    },
  };
  var {count, rows} = await scholarshipType.findAndCountAll(options);
  var scholarshipsObject = {
    count,
    rows
  }

  return scholarshipsObject;

}

async function deleteScholarship(id){
  await scholarshipType.destroy({where:{id}})
}

async function getUserScholarships(courseList){
  try {
    var i= 0
    var actualDate = new Date()
    var userScholarshipList = [];
    var idList = [];
    let options = {
      include:scholarshipCourses,
      where: {
        endDate:{
          [Op.gte]: actualDate
        },
      },
    };
    
    var rta = await scholarshipType.findAll(options);

    rta.forEach((scholarship) => {
      courseList.forEach(async (courseId) => {
        var found = scholarship.scholarshipCourses.findIndex(element => courseId == element.courseId)
        if(found -= -1){
          idList.push(scholarship.id)
        }
      });
    });
    
    idList.forEach((id)=>{
      var found1 = rta.findIndex(element => element.id == id)
      rta.splice(found1,1)
    })

    return rta

  } catch (err) {
    return err;
  }
}

module.exports = { manualEnrollment, passed, manualCourseEnrol,createScholarshipRegister, createScholarship, getScholarship, getUserScholarships, deleteScholarship, updateScholarship, updateScholarshipImg };
