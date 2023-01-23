const fetch = require("node-fetch");
const {temporal} = require("../../models/index")

async function Exist(user){
  var url =
    "https://quark.academy/webservice/rest/server.php?wstoken=11e282e69970c31ed54f38925921b88f&wsfunction=core_user_get_users&criteria[0][key]=confirm&criteria[0][value]=true&moodlewsrestformat=json";

  var response = await fetch(url);
  var data = await response.json();

  var found = data.users.findIndex((element) => element.username == user.username);

  if (found != -1) {
    throw new Error("El username ya existe!");
  }

  var found1 = data.users.findIndex((element) => element.email == user.email);

  if (found1 != -1) {
    throw new Error("Este email ya esta en uso!");
  }

  
}

async function createTemporal(user){
    temporal.create({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        password: user.password,
        email: user.email
    }).catch(err => {throw new Error("No se pudo crear, intente de nuevo!")})
}

module.exports = {Exist, createTemporal}