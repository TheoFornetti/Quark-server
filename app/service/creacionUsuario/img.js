const fetch = require("node-fetch")
let data = [];

async function obtenerImg(){
    let listaImagenes = [];
    var lista = [];
  const core_course_get_courses_by_field = `https://quark.academy/webservice/rest/server.php?wstoken=4fc7cc36ba637f32cbec282ea5352ba7&wsfunction=core_course_get_courses_by_field&moodlewsrestformat=json`;

  try{
    let response = await fetch(core_course_get_courses_by_field)
    let data = await response.json()
    
    data.courses.forEach((img) => {
        if (img.overviewfiles.length > 0) {
          let url = img.overviewfiles[0].fileurl;
          url = url.replace("webservice/","");
          let imgcurso = {
            id: img.id,
            url: url
          }

          listaImagenes.push(imgcurso)
        }
      })
      return listaImagenes

    } catch(err) {
      console.log(err)
    }
    
}

async function mostrarImg(usuarioCursos){
  let data = await obtenerImg()
  
  usuarioCursos.listaCurso.forEach(curso => {
    
    let url = data.find(element => element.id == curso.idCurso)
    curso.url = url.url
  })

  if(usuarioCursos.listaGameJams.length > 0){
    usuarioCursos.listaGameJams.forEach(curso =>{
      let url = data.find(element => element.id == curso.idCurso)
      curso.url = url.url
    })
  }
  
  return usuarioCursos 
}

module.exports = mostrarImg



