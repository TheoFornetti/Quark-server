const fetch = require("node-fetch")
const db = require("./db-cursos")

async function agregarCursos(usuario) {
  let usuarioCurso;
  let curso;
  
  const core_enrol_get_users_courses = `https://quark.academy/webservice/rest/server.php?wstoken=11e282e69970c31ed54f38925921b88f&wsfunction=core_enrol_get_users_courses&userid=${usuario.id}&moodlewsrestformat=json`;

  try {
    let response = await fetch(core_enrol_get_users_courses);
    let data = await response.json();

    await db.obtenerSecreto(usuario.id).then((values) => {
      data.forEach((cursos) => {
        for (var i = 0; i < values.length; i++) {
          if (cursos.id == values[i].course) {
            var date = new Date(
              values[i].timeenrolled * 1000
            ).toLocaleDateString();

            if(cursos.fullname.match("Quark Game Jam")){
              curso = {
                fullName: cursos.fullname,
                lastaccess: cursos.lastaccess,
                idCurso: cursos.id,
                progress: cursos.progress,
                timestarted: date,
                url: "",
                
              };
              usuario.listaGameJams.push(curso);
            }else{
              curso = {
                fullName: cursos.fullname,
                lastaccess: cursos.lastaccess,
                idCurso: cursos.id,
                progress: cursos.progress,
                timestarted: date,
                url: "",
                
              };
              usuario.listaCurso.push(curso);
            }
          }
        }
      });
      usuarioCurso = usuario;
    });
    return usuarioCurso;
  } catch (err) {
    console.log(err);
  }
}

 async function devolverUsuarioCurso(usuario) {
  let usuarioCurso = await agregarCursos(usuario);

  return usuarioCurso;
}

module.exports = devolverUsuarioCurso
