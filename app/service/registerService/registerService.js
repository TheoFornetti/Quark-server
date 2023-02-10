const fetch = require("node-fetch");
const { temporal } = require("../../models/index");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const NodeRsa = require("node-rsa") 
const key = new NodeRsa({b: 512});
let conexion;

conexion = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "R#fT7gH9",
  database: "moodle",
});
const funciona = () => {
  conexion.connect((err) => {
    if (err) throw err;
    console.log("Conectado");
  });
};
function obtenerSecret(username) {
  console.log(username);
  return new Promise((resolve, reject) => {
    conexion.query(
      `SELECT *
        FROM mdl_user where username = "${username}"`,
      (err, r) => {
        if (err) return reject;
        return resolve(r);
      }
    );
  });
}

async function obtenerSecreto(username) {
  try {
    
    const data = await obtenerSecret(username); // almacenamos el resultado por si queremos trabajar con el mismo
    return data;
  } catch (err) {
    console.log(err);
  }
}

async function Exist(user) {

  var email = user.email
  var username = user.username

  var url =
    "http://34.71.113.200/moodle/webservice/rest/server.php?wstoken=de19f86bde31dfb08f817681f4414238&wsfunction=core_user_get_users&criteria[0][key]=confirm&criteria[0][value]=true&moodlewsrestformat=json";

  var response = await fetch(url);
  var data = await response.json();

  var found = data.users.findIndex(
    (element) => element.username == user.username
  );

  if (found != -1) {
    throw new Error("El username ya existe!");
  }

  var found1 = data.users.findIndex((element) => element.email == user.email);

  if (found1 != -1) {
    throw new Error("Este email ya esta en uso!");
  }

  var rta = await temporal.findAll({where: {username}})

  if(rta.length != 0){
    throw new Error("El username ya existe!");
  }

  var rta1 = await temporal.findAll({where: {email}})

  if(rta1.length != 0){
    throw new Error("Este email ya esta en uso!");
  }

}

async function createTemporal(user) {
    // var password = key.encrypt(user.password, "base64" )

  await temporal.create({
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    password: user.password,
    email: user.email,
  });
}

async function getTemporal(id) {
  var user = await temporal.findAll({ where: { id } });
  return user;
}

async function createMoodleUser(user) {
  try {
    console.log(user[0].email)
    
    var url = `http://34.71.113.200/moodle/webservice/rest/server.php?wstoken=de19f86bde31dfb08f817681f4414238&wsfunction=auth_email_signup_user&username=${user[0].username}&password=${user[0].password}&firstname=${user[0].firstName}&lastname=${user[0].lastName}&email=${user[0].email}&moodlewsrestformat=json`;

    var response = await fetch(url);
    var data = await response.json();
    
   
  } catch (err) {
    throw new Error("No se pudo crear el usuario!" + err.message);
  }
}

async function confirmUser(user) {
  try {
    var moodleUser = await obtenerSecreto(user[0].username);
    
    var url = `http://34.71.113.200/moodle/webservice/rest/server.php?wstoken=de19f86bde31dfb08f817681f4414238&wsfunction=core_auth_confirm_user&username=${user[0].username}&secret=${moodleUser[0].secret}&moodlewsrestformat=json`;
    var response = await fetch(url);
    var data = await response.json();
    console.log(data);
    return moodleUser[0].id;
  } catch (err) {
    throw new Error("No se pudo confirmar el usuario");
  }
}

async function enrollUser(id) {
  try {
    var url = `http://34.71.113.200/moodle/webservice/rest/server.php?wstoken=de19f86bde31dfb08f817681f4414238&wsfunction=core_cohort_add_cohort_members&members[0][cohorttype][type]=id&members[0][cohorttype][value]=1&members[0][usertype][type]=id&members[0][usertype][value]=${id}&moodlewsrestformat=json`;
    var response = await fetch(url);
    var data = await response.json();
    console.log(data);
  } catch (err) {
    throw new Error("No se pudo dar de alta en un cohorte!");
  }
}

module.exports = {
  Exist,
  createTemporal,
  getTemporal,
  createMoodleUser,
  confirmUser,
  enrollUser,
};
