const fetch = require("node-fetch")
const db = require("./db-cursos")

async function agregarCursos(usuario) {
  let usuarioCurso;
  let curso;
  
  const core_enrol_get_users_courses = `${process.env.VM_IP}/moodle/webservice/rest/server.php?wstoken=de19f86bde31dfb08f817681f4414238&&wsfunction=core_enrol_get_users_courses&userid=${usuario.id}&moodlewsrestformat=json`;

  try {
    let response = await fetch(core_enrol_get_users_courses);
    let data = await response.json();
    data.forEach((cursos) => {
      var date = new Date(
                  cursos.lastaccess * 1000
                ).toLocaleDateString()
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
    })
    

    // await db(usuario.id).then((values) => {
    //   console.log(values)
    //   data.forEach((cursos) => {
    //     for (var i = 0; i < values.length; i++) {
    //       if (cursos.id == values[i].course) {
    //         var date = new Date(
    //           values[i].timeenrolled * 1000
    //         ).toLocaleDateString();

    //         if(cursos.fullname.match("Quark Game Jam")){
    //           curso = {
    //             fullName: cursos.fullname,
    //             lastaccess: cursos.lastaccess,
    //             idCurso: cursos.id,
    //             progress: cursos.progress,
    //             timestarted: date,
    //             url: "",
                
    //           };
    //           usuario.listaGameJams.push(curso);
    //         }else{
    //           curso = {
    //             fullName: cursos.fullname,
    //             lastaccess: cursos.lastaccess,
    //             idCurso: cursos.id,
    //             progress: cursos.progress,
    //             timestarted: date,
    //             url: "",
                
    //           };
    //           usuario.listaCurso.push(curso);
    //         }
    //       }
    //     }
    //   });
      usuarioCurso = usuario;
    // });
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
