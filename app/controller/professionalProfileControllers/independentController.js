const { createIndependent, updateIndependent, deleteIndependent, getIndependent } = require("../../service/userServices/independentService")

var independentController = {
    read: async(req,res)=>{
        try{
            var rta = await getIndependent(req.params.id)
            res.send(rta)
        }catch(err){
            console.log(err)
            res.sendStatus(500)
        }
    },

    create: async (req,res)=>{
       try{
        var rta = await createIndependent(req.body.userid, req.body.independent)
        res.send(rta)
       }catch(err){
        res.sendStatus(500)
       }
    },

    update: async (req,res)=>{
        try{
            var rta = await updateIndependent(req.body.id, req.body.independent)
            res.send(rta)
        }catch(err){
            res.sendStatus(500)
        }
    },

    delete: async(req,res)=>{
        try{
            var rta = await deleteIndependent(req.params.id)
            res.sendStatus(200)
        }catch{
            res.sendStatus(500)
        }
    }
}

module.exports = independentController