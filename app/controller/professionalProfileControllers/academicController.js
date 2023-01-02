const { createAcademics, updateAcademics, deleteAcademics, getAcademics } = require("../../service/userServices/academicService")

var academicController = {
    read:async (req,res)=>{
        try{
            console.log(req.params.id)
            const rta = await getAcademics(req.params.id)
            res.send(rta)
        }catch(err){
            console.log(err)
            res.sendStatus(500)
        }
    },
    create: async (req,res) =>{
        try{
            var rta = await createAcademics(req.body.userid, req.body.academics)
            res.send(rta)
        }catch(err){
            throw err
        }
    },
    update: async(req,res) =>{
        var rta = await updateAcademics(req.body.id, req.body.academics)
        res.send(rta)
    },
    delete: async(req,res) =>{
        console.log("Hola")
        var rta = await deleteAcademics(req.params.id)
        res.sendStatus(200)
    }
}

module.exports = academicController