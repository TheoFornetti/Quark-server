const { createLabors, updateLabors, deleteLabors, getLabors } = require("../../service/userServices/laborsService")

var laborController = {
    read: async(req,res)=>{
        try{
            var rta = await getLabors(req.params.id)
            res.send(rta)
        }catch(err){
            console.log(err)
            res.send(500)
        }
    },
    create: async (req,res)=>{
       try{
        var rta = await createLabors(req.body.userid, req.body.labor)
        res.send(rta)
       }catch(err){
        console.log(err)
        res.sendStatus(500)
       }
    },

    update: async (req,res)=>{
        try{
            var rta = await updateLabors(req.body.id, req.body.labor)
            res.send(rta)
        }catch(err){
            console.log(err)
            res.sendStatus(500)
        }
    },

    delete: async(req,res)=>{
        try{
            var rta = await deleteLabors(req.params.id)
            res.sendStatus(200)
        }catch(err){
            console.log(err)
            res.sendStatus(500)
        }
    }
}

module.exports = laborController