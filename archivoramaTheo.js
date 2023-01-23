const fetch = require("node-fetch");

var usernames = ["theo_fornetti", "julia_nazar"];
var email = ["theofornetti2001@gmail.com"];

async function Existe(nick, mail) {
  var url =
    "https://quark.academy/webservice/rest/server.php?wstoken=11e282e69970c31ed54f38925921b88f&wsfunction=core_user_get_users&criteria[0][key]=confirm&criteria[0][value]=true&moodlewsrestformat=json";

  var response = await fetch(url);
  var data = await response.json();

  var found = data.users.findIndex((element) => element.username == nick);

  if (found != -1) {
    throw new Error("El username ya existe!");
  }

  var found1 = data.users.findIndex((element) => element.email == mail);

  if (found1 != -1) {
    throw new Error("Este email ya esta en uso!");
  }
}


var nick = "Theoasdasf";
var mail = "theofornetti2001@gmail.com";
Existe(nick, mail).catch((e) => console.error(e.message));
