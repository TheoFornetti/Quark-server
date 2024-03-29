const { createSkill, updateSkill, deleteSkill, getSkill } = require("../../service/userServices/skillService")

var skillController = {
    read: async(req,res)=>{
        try{
            var rta = await getSkill(req.params.id)
            res.send(rta)
        }catch(err){
            console.log(err)
            res.sendStatus(500)
        }
    },
    create: async (req,res)=>{
        try{
            var rta = await createSkill(req.body.userid, req.body.skills)
            res.send(rta.studentSkills)
        }catch(err){
            res.sendStatus(500)
            console.log(err)
        }
    },
    update: async (req,res)=>{
       try{
        await updateSkill(req.body.id, req.body.skills)
        res.sendStatus(200)
       }catch(err){
        console.log(err)
        res.sendStatus(500)
       }
    },
    delete: async (req,res)=>{
        try{
            var rta1 = await deleteSkill(req.params.id)
            res.send(rta1)
        }catch(err){
            console.log(err)
            res.sendStatus(500)
        }
    }
}

module.exports = skillController