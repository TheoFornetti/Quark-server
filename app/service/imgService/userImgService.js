
const {userBasicData} = require("../../models/index")

async function getUserImage(professionalProfileId){
    var rta = await userBasicData.findAll({where:{professionalProfileId}})
    return rta
}



module.exports = {getUserImage}