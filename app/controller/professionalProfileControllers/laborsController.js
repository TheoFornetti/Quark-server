const { createLabors, updateLabors, deleteLabors } = require("../../service/userServices/laborsService")

var laborController = {
    create: async (req,res)=>{
       var rta = await createLabors(req.body.userid, req.body.labor)
       res.send(rta)
    },

    update: async (req,res)=>{
        var rta = await updateLabors(req.body.id, req.body.labor)
        res.send(rta)
    },

    delete: async(req,res)=>{
        var rta = await deleteLabors(req.params.id)
        res.sendStatus(200)
    }
}

module.exports = laborController