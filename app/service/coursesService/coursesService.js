const fetch = require("node-fetch");
const devolverUsuarioCurso = require("../creacionUsuario/agregarCursos");

async function getMoodleCourses(listaCursos) {
  try {
    var courseList = [];
    var response = await fetch(
      `${process.env.VM_IP}/webservice/rest/server.php?wstoken=${process.env.TOKEN}&wsfunction=core_course_get_courses_by_field&moodlewsrestformat=json`
    );

    var data = await response.json();

    data.courses.forEach((course) => {
      if (course.overviewfiles.length > 0) {
        let url = course.overviewfiles[0].fileurl;
        url = url.replace("webservice/", "");

        var course = {
          idCurso: course.id,
          fullName: course.fullname,
          url,
          purchased: false,
        };

        courseList.push(course);
      }
    });

    let unityInicial = [];
    let unityIntermedio = [];
    let unrealInicial = [];
    let unrealIntermedio = [];
    let unityAvanzado = [];
    let unrealAvanzado = [];

    let punityInicial = [];
    let punityIntermedio = [];
    let punrealInicial = [];
    let punrealIntermedio = [];
    let punityAvanzado = [];
    let punrealAvanzado = [];
    let curso;
   
    courseList.forEach((course) => {
      switch (course.idCurso) {
        case 18:
          var cSharp = listaCursos.some(
            (curso) => course.idCurso == curso.idCurso
          );
          curso = listaCursos.findIndex(
            (curso) => course.idCurso == curso.idCurso
          );

          if (cSharp) {
            course.purchased = true;
            course.progress = Math.round(listaCursos[curso].progress);
            unityInicial.push(course);
          } else {
            unityInicial.push(course);
          }
          break;
        case 25:
          var cPlus = listaCursos.some(
            (curso) => course.idCurso == curso.idCurso
          );
          curso = listaCursos.findIndex(
            (curso) => course.idCurso == curso.idCurso
          );

          if (cPlus) {
            course.purchased = true;
            course.progress = Math.round(listaCursos[curso].progress);
            unrealInicial.push(course);
          } else {
            unrealInicial.push(course);
          }
          break;
        case 11:
          var Matematicas = listaCursos.some(
            (curso) => course.idCurso == curso.idCurso
          );
          curso = listaCursos.findIndex(
            (curso) => course.idCurso == curso.idCurso
          );

          if (Matematicas) {
            course.purchased = true;
            course.progress = Math.round(listaCursos[curso].progress);
            unrealInicial.push(course);
          } else {
            unrealInicial.push(course);
          }
          break;
        case 6:
          var solid = listaCursos.some(
            (curso) => course.idCurso == curso.idCurso
          );
          curso = listaCursos.findIndex(
            (curso) => course.idCurso == curso.idCurso
          );

          if (solid) {
            course.purchased = true;
            course.progress = Math.round(listaCursos[curso].progress);
            unityIntermedio.push(course);
            unrealIntermedio.push(course);
          } else {
            unityIntermedio.push(course);
            unrealIntermedio.push(course);
          }
          break;
        case 8:
          var gof = listaCursos.some(
            (curso) => course.idCurso == curso.idCurso
          );
          curso = listaCursos.findIndex(
            (curso) => course.idCurso == curso.idCurso
          );

          if (gof) {
            course.purchased = true;
            course.progress = Math.round(listaCursos[curso].progress);
            unityIntermedio.push(course);
          } else {
            unityIntermedio.push(course);
          }
          break;
        case 14:
          var unity = listaCursos.some(
            (curso) => course.idCurso == curso.idCurso
          );
          curso = listaCursos.findIndex(
            (curso) => course.idCurso == curso.idCurso
          );

          if (unity) {
            course.purchased = true;
            course.progress = Math.round(listaCursos[curso].progress);
            unityIntermedio.push(course);
          } else {
            unityIntermedio.push(course);
          }
          break;
        case 15:
          var unreal = listaCursos.some(
            (curso) => course.idCurso == curso.idCurso
          );
          curso = listaCursos.findIndex(
            (curso) => course.idCurso == curso.idCurso
          );

          if (unreal) {
            course.purchased = true;
            course.progress = Math.round(listaCursos[curso].progress);
            unrealIntermedio.push(course);
          } else {
            unrealIntermedio.push(course);
          }
          break;
        case 30:
          var trivia = listaCursos.some(
            (curso) => course.idCurso == curso.idCurso
          );
          curso = listaCursos.findIndex(
            (curso) => course.idCurso == curso.idCurso
          );

          if (trivia) {
            course.purchased = true;
            course.progress = Math.round(listaCursos[curso].progress);
            unityAvanzado.push(course);
          } else {
            unityAvanzado.push(course);
          }
          break;
        case 27:
          var combate = listaCursos.some(
            (curso) => course.idCurso == curso.idCurso
          );
          curso = listaCursos.findIndex(
            (curso) => course.idCurso == curso.idCurso
          );

          if (combate) {
            course.purchased = true;
            course.progress = Math.round(listaCursos[curso].progress);
            unrealAvanzado.push(course);
          } else {
            unrealAvanzado.push(course);
          }
          break;
      }
    });

    let idIntermedioUnity = [6,8,14]
    let idIntermedioUnreal = [6,15]
    var unityCounter = 0
    var unrealCounter = 0

    idIntermedioUnity.forEach(id=> {
      console.log(listaCursos)
      var unity = unityIntermedio.some(course => course.idCurso == id && course.purchased == true)

      if(unity){
        unityCounter++
      }
    })

    if(unityCounter == 3){
      punityIntermedio = true
    }else{
      punityIntermedio = false
    }

    idIntermedioUnreal.forEach(id=> {
      var unity = unrealIntermedio.some(course => id == course.idCurso && course.purchased == true)

      if(unity){
        unrealCounter++
      }
    })

    if(unityCounter == 2){
      punrealIntermedio = true
    }else{
      punrealIntermedio = false
    }

    punityInicial = unityInicial.some((element) => element.purchased == true);
     
    punityAvanzado = unityAvanzado.some((element) => element.purchased == true);

    punrealInicial = unrealInicial.some((element) => element.purchased == true);
    
    punrealAvanzado = unrealAvanzado.some(
      (element) => element.purchased == true
    );

    return {
      unityInicial,
      unityIntermedio,
      unityAvanzado,
      unrealInicial,
      unrealIntermedio,
      unrealAvanzado,
      punityInicial,
      punityIntermedio,
      punityAvanzado,
      punrealInicial,
      punrealIntermedio,
      punrealAvanzado,
    };
  } catch (err) {
    return err;
  }
}

module.exports = {
  getMoodleCourses,
};
