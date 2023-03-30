const fetch = require("node-fetch");

async function getMoodleCourses() {
  try {
    var courseList = [];
    var response = await fetch(
      `${process.env.VM_IP}/moodle/webservice/rest/server.php?wstoken=de19f86bde31dfb08f817681f4414238&wsfunction=core_course_get_courses_by_field&moodlewsrestformat=json`
    );

    var data = await response.json();
    data.courses.forEach((course) => {
      if (course.overviewfiles.length > 0) {
        let url = course.overviewfiles[0].fileurl;
        url = url.replace("webservice/", "");

        var course = {
          idCurso: course.id,
          fullname: course.fullname,
          url,
        };

        courseList.push(course);
      }
    });

    let unityInicial = [];
    let unityIntermedio = [];
    let unrealInicial = [];
    let unrealIntermedio = [];

    courseList.forEach((course) => {
      switch (course.idCurso) {
        case 2:
          unityInicial.push(course);
          break;
        case 3:
          unrealInicial.push(course);
          break;
        case 9:
          unrealInicial.push(course);
          break;
        case 10:
          unityIntermedio.push(course);
          unrealIntermedio.push(course);
          break;
        case 11:
          unityIntermedio.push(course);
          break;
        case 12:
          unityIntermedio.push(course);
          break;
        case 13:
          unrealIntermedio.push(course);
          break;
      }
    });

    return { unityInicial, unityIntermedio, unrealInicial, unrealIntermedio };
  } catch (err) {
    return err;
  }
}

module.exports = {
  getMoodleCourses,
};
