const fetch = require("node-fetch");

async function crearUsuario(email) {
  
  let usuario = {};
  let listaCurso = [];
  let badgesList = [];
  let listaGameJams = []
  let curso = {};

  if (email.includes("@")) {
    var core_user_get_user = `${process.env.VM_IP}/webservice/rest/server.php?wstoken=${process.env.TOKEN}&wsfunction=core_user_get_users&criteria[0][key]=email&criteria[0][value]=${email}&moodlewsrestformat=json`;
  } else {
    var core_user_get_user = `${process.env.VM_IP}/webservice/rest/server.php?wstoken=${process.env.TOKEN}&wsfunction=core_user_get_users&criteria[0][key]=username&criteria[0][value]=${email}&moodlewsrestformat=json`;
  }

  try {
    let response = await fetch(core_user_get_user);
    let data = await response.json();
    
    console.log(data.users)

    if(data.users.length == 0){
      throw new Error("No existe ese nombre de usuario")
    }

    function getValueOrDefault(obj, propName, defaultValue = "") {
      if (typeof obj[propName] === "undefined" || obj[propName] === null) {
        return defaultValue;
      }
      return obj[propName];
    }
    
    const phone = getValueOrDefault(data.users[0], "phone2");
    const city = getValueOrDefault(data.users[0], "city");
    const idnumber = getValueOrDefault(data.users[0], "idnumber");
    const country = getValueOrDefault(data.users[0], "country");
    
    usuario = {
      id: data.users[0].id,
      username: data.users[0].username,
      firstname: data.users[0].firstname,
      lastname: data.users[0].lastname,
      email: data.users[0].email,
      country,
      city,
      phone,
      idnumber,
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
