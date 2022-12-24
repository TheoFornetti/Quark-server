const fetch = require("node-fetch")


async function agregarInsignias(user){
    let userBadges = {};
    let badgesList = [];
    const core_badges_get_user_badges = `https://quark.academy/webservice/rest/server.php?wstoken=4fc7cc36ba637f32cbec282ea5352ba7&wsfunction=core_badges_get_user_badges&userid=${user.id}&moodlewsrestformat=json`

    let response = await fetch(core_badges_get_user_badges)
    let data = await response.json()
    console.log(data)

    data.badges.forEach(badges => {
        let url = badges.badgeurl;
          url = url.replace("webservice/","");
        userBadges = {
            name : badges.name,
            badgeUrl: url 
        }

        badgesList.push(userBadges)
    });

    return badgesList
}

 async function retornarInsignia(user){
    let usuarioCompleto = await agregarInsignias(user)
    
    usuarioCompleto.forEach(badge =>{
        user.badgesList.push(badge)
    })
    
    return user
    
}

module.exports = retornarInsignia

