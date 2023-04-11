const fetch = require("node-fetch");
const { temporal, notDevelopers } = require("../../models/index");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const NodeRsa = require("node-rsa");
const key = new NodeRsa({ b: 512 });
let conexion;

conexion = mysql.createConnection({
  user: process.env.MOODLE_USERNAME ,
    password: process.env.MOODLE_PASSWORD,
    database: process.env.MOODLE_DATABASE,
    host: process.env.MOODLE_HOST,
});
const funciona = () => {
  conexion.connect((err) => {
    if (err) throw err;
    console.log("Conectado");
  });
};
function obtenerSecret(username) {  
  console.log(username
    )
 
  return new Promise((resolve, reject) => {
    conexion.query(
      `SELECT *
        FROM mdl_user where email = "${username}"`,
      (err, r) => {
        if (err) return reject;
        console.log(r)
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
  var email = user.email;
  var idnumber = user.idnumber;

  var url =
    process.env.VM_IP +
    `/webservice/rest/server.php?wstoken=${process.env.TOKEN}&wsfunction=core_user_get_users&criteria[0][key]=confirm&criteria[0][value]=true&moodlewsrestformat=json`;

  var response = await fetch(url);
  var data = await response.json();

  var found1 = data.users.findIndex((element) => element.email == user.email);

  if (found1 != -1) {
    throw new Error("Este email ya esta en uso!");
  }

  var found2 = data.users.findIndex(
    (element) => element.idnumber == user.idnumber
  );

  var rta1 = await temporal.findAll({ where: { email } });

  if (rta1.length != 0) {
    throw new Error("Este email ya esta en uso!");
  }

  var found = await notDevelopers.findAll({where:{email}})

  if(found.length != 0){
      throw new Error("Ya intentaste de registrarte con este mail")
  }
}

async function createTemporal(user, rta) {
  var username0 = user.firstName + user.lastName;

  var randomNumber1 = Math.round(Math.random() * 100);
  var randomNumber2 = Math.round(Math.random() * 100);
  username0 = username0 + randomNumber1 + randomNumber2;
  var username = username0.toLowerCase()
  await temporal.create({
    username,
    firstName: user.firstName,
    lastName: user.lastName,
    password: user.password,
    email: user.email,
    idnumber: user.idnumber,
  });

  return username;
}

async function getTemporal(id) {
  var user = await temporal.findAll({ where: { id } });
 
  return user;
}

async function createMoodleUser(user) {
  try {
    

    var url = `${process.env.VM_IP}/webservice/rest/server.php?wstoken=${process.env.TOKEN}&wsfunction=auth_email_signup_user&username=${user[0].username}&password=${user[0].password}&firstname=${user[0].firstName}&lastname=${user[0].lastName}&email=${user[0].email}&moodlewsrestformat=json`;

    console.log(url)

    var response = await fetch(url);
    var data = await response.json();
  } catch (err) {
    throw new Error("No se pudo crear el usuario!" + err.message);
  }
}

async function confirmUser(user) {
  try {
    var moodleUser = await obtenerSecreto(user[0].email);
    console.log(moodleUser)
    var url = `${process.env.VM_IP}/webservice/rest/server.php?wstoken=${process.env.TOKEN}&wsfunction=core_auth_confirm_user&username=${user[0].username}&secret=${moodleUser[0].secret}&moodlewsrestformat=json`;
    var response = await fetch(url);
    var data = await response.json();
    console.log(data);
    return moodleUser[0].id;
  } catch (err) {
    throw new Error("No se pudo confirmar el usuario" + err.message);
  }
}

async function enrollUser(id) {
  try {
    var url = `${process.env.VM_IP}/webservice/rest/server.php?wstoken=${process.env.TOKEN}&wsfunction=core_cohort_add_cohort_members&members[0][cohorttype][type]=id&members[0][cohorttype][value]=1&members[0][usertype][type]=id&members[0][usertype][value]=${id}&moodlewsrestformat=json`;
    var response = await fetch(url);
    var data = await response.json();
    console.log(data);
  } catch (err) {
    throw new Error("No se pudo dar de alta en un cohorte!");
  }
}

async function addIdNumber(id, user) {
  try {
    console.log("Hola");
    console.log(user[0].idnumber);
    var response = await fetch(
      `${process.env.VM_IP}/webservice/rest/server.php?wstoken=${process.env.TOKEN}&wsfunction=core_user_update_users&moodlewsrestformat=json&users[0][id]=${id}&users[0][idnumber]=${user[0].idnumber}`
    );
  } catch {
    throw new Error("No se pudo agregar el dni");
  }
}

module.exports = {
  Exist,
  createTemporal,
  getTemporal,
  createMoodleUser,
  confirmUser,
  enrollUser,
  addIdNumber,
};

funciona()