const fetch = require("node-fetch")


async function agregarInsignias(user){
    let userBadges = {};
    let badgesList = [];
    const core_badges_get_user_badges = `${process.env.VM_IP}/moodle/webservice/rest/server.php?wstoken=de19f86bde31dfb08f817681f4414238&wsfunction=core_badges_get_user_badges&userid=${user.id}&moodlewsrestformat=json`

    let response = await fetch(core_badges_get_user_badges)
    let data = await response.json()
    // console.log(data)

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

