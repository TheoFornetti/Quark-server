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
          purchased:false
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

    courseList.forEach((course) => {
      switch (course.idCurso) {
        case 18:
          
          var cSharp = listaCursos.some(curso => course.idCurso == curso.idCurso)
          var curso = listaCursos.findIndex(curso => course.idCurso == curso.idCurso)

          if(cSharp){
            course.purchased = true
            course.progress = listaCursos[curso].progress
            unityInicial.push(course);
          }else{
            unityInicial.push(course);
          }
          break;
        case 25:
          
          var cPlus = listaCursos.some(curso => course.idCurso == curso.idCurso)
         
          if(cPlus){
            course.purchased = true
             unrealInicial.push(course);
          }else{
             unrealInicial.push(course);
          }
          break;
        case 11:
          
          var Matematicas = listaCursos.some(curso => course.idCurso == curso.idCurso)
         
          if(Matematicas){
            course.purchased = true
            unrealInicial.push(course);
          }else{
            unrealInicial.push(course);
          }
          break;
        case 6:
          var solid = listaCursos.some(curso => course.idCurso == curso.idCurso)
         
          if(solid){
            course.purchased = true
            unityIntermedio.push(course);
            unrealIntermedio.push(course);
          }else{
            unityIntermedio.push(course);
            unrealIntermedio.push(course);     
          }
          break;
        case 8:
          
          var gof = listaCursos.some(curso => course.idCurso == curso.idCurso)
         
          if(gof){
            course.purchased = true
            unityIntermedio.push(course);
          }else{
            unityIntermedio.push(course);
          }
          break;
        case 14:
          
          var unity = listaCursos.some(curso => course.idCurso == curso.idCurso)
         
          if(unity){
            course.purchased = true
            unityIntermedio.push(course);
          }else{
            unityIntermedio.push(course);
          }
          break;
        case 15:
         
          var unreal = listaCursos.some(curso => course.idCurso == curso.idCurso)
         
          if(unreal){
            course.purchased = true
             unrealIntermedio.push(course);
          }else{
             unrealIntermedio.push(course);
          }
          break;
        case 30:
          
          var trivia = listaCursos.some(curso => course.idCurso == curso.idCurso)
         
          if(trivia){
            course.purchased = true
            unityAvanzado.push(course)
          }else{
            unityAvanzado.push(course)
          }
          break;
        case 27: 
         

          var combate = listaCursos.some(curso => course.idCurso == curso.idCurso)
         
          if(combate){
            course.purchased = true
             unrealAvanzado.push(course)
          }else{
             unrealAvanzado.push(course)
          }
          break
      }
    });

    punityInicial = unityInicial.some(element => (element.purchased == true))
    punityIntermedio = unityIntermedio.some(element => (element.purchased == true))
    punityAvanzado = unityAvanzado.some(element => (element.purchased == true))
    
    punrealInicial = unrealInicial.some(element => (element.purchased == true))
    punrealIntermedio = unrealIntermedio.some(element => (element.purchased == true))
    punrealAvanzado = unrealAvanzado.some(element => (element.purchased == true))
    

    return { unityInicial, unityIntermedio, unityAvanzado, unrealInicial, unrealIntermedio, unrealAvanzado, punityInicial,punityIntermedio,punityAvanzado,punrealInicial,punrealIntermedio,punrealAvanzado };
  } catch (err) {
    return err;
  }
}

module.exports = {
  getMoodleCourses,
};
