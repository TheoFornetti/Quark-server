const { where } = require("sequelize")
const {sesskey, professionalProfile} = require("../../models/index")
const { createUser } = require("./professionalProfileService")

async function getSessionKey(professionalProfileId){
    var rta = await sesskey.findAll({where:{professionalProfileId}})
    return rta
}
async function createReadUpdate(professionalProfileId, sessKey){
                                             
    var rta = await sesskey.findAll({ attributes: ['sesskey'],
        where: {
            professionalProfileId
        }
    })


    
    if(rta.length == 0){
        
        await sesskey.create({
            sesskey: sessKey,
            professionalProfileId
        })

        var rta = await sesskey.findAll({ attributes: ['sesskey'],
        where: {
            professionalProfileId

        }}
        )
        return rta[0]

    }else{
        //updates sesskey
        await sesskey.update({
            sesskey:sessKey
        },{
            where:{
                professionalProfileId
            }
        })
        var rta = await sesskey.findAll({ attributes: ['sesskey'],
        where: {
            professionalProfileId
        }}
        )
        return rta[0]
    }
        
    
    
}

module.exports = {getSessionKey, createReadUpdate}