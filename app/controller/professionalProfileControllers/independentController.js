const { createIndependent, updateIndependent, deleteIndependent } = require("../../service/userServices/independentService")

var independentController = {
    create: async (req,res)=>{
       var rta = await createIndependent(req.body.userid, req.body.independent)
       res.send(rta)
    },

    update: async (req,res)=>{
        var rta = await updateIndependent(req.body.id, req.body.independent)
        res.send(rta)
    },

    delete: async(req,res)=>{
        var rta = await deleteIndependent(req.params.id)
        res.sendStatus(200)
    }
}

module.exports = independentController