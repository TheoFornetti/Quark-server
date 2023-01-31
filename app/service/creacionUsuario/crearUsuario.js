const fetch = require("node-fetch");

async function crearUsuario(email) {
  
  let usuario = {};
  let listaCurso = [];
  let badgesList = [];
  let listaGameJams = []
  let curso = {};

  if (email.includes("@")) {
    var core_user_get_user = `http://34.71.113.200/moodle/webservice/rest/server.php?wstoken=de19f86bde31dfb08f817681f4414238&wsfunction=core_user_get_users&criteria[0][key]=email&criteria[0][value]=${email}&moodlewsrestformat=json`;
  } else {
    var core_user_get_user = `http://34.71.113.200/moodle/webservice/rest/server.php?wstoken=de19f86bde31dfb08f817681f4414238&wsfunction=core_user_get_users&criteria[0][key]=username&criteria[0][value]=${email}&moodlewsrestformat=json`;
  }

  try {
    let response = await fetch(core_user_get_user);
    let data = await response.json();
    
    console.log(data.users)
    usuario = {
      id: data.users[0].id,
      username: data.users[0].username,
      firstname: data.users[0].firstname,
      lastname: data.users[0].lastname,
      email: data.users[0].email,
      country: data.users[0].country,
      city: data.users[0].city,
      phone: data.users[0].phone2,
      badgesList,
      listaCurso,
      listaGameJams
    };
    console.log(usuario)
    
    return usuario;
  } catch (err) {
    console.log(err);
  }
}

async function devolverUsuario(email) {
  let usuario = await crearUsuario(email);

  return usuario;
}

module.exports = devolverUsuario
