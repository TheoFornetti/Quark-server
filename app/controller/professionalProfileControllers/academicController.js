const { createAcademics, updateAcademics, deleteAcademics } = require("../../service/userServices/academicService")

var academicController = {
    create: async (req,res) =>{
        try{
            var rta = await createAcademics(req.body.userid, req.body.academic)
            res.send(rta)
        }catch(err){
            throw err
        }
    },
    update: async(req,res) =>{
        var rta = await updateAcademics(req.body.id, req.body.academic)
        res.send(rta)
    },
    delete: async(req,res) =>{
        var rta = await deleteAcademics(req.params.id)
        res.sendStatus(200)
    }
}

module.exports = academicController