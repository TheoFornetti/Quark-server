const { getSessionKey, createReadUpdate } = require("../../service/userServices/sesskeyService")

var sesskeyController = {
    getSesskey: async (req,res)=>{
        try{
            var sesskey = await getSessionKey(req.params.id)
        res.send(sesskey)
        }catch(err){
            throw err
        }
    },

    RCU: async (req,res)=>{
        res.send(await createReadUpdate(req.body.id, req.body.sesskey))

    }
}

module.exports = sesskeyController