const { createLanguage, deleteLanguage, updateLanguage, getLanguage } = require("../../service/userServices/languageService")

var languageController = {
    read: async(req,res)=>{
        try{
            var rta = await getLanguage(req.params.id)
            res.send(rta)
        }catch(err){
            console.log(err)
            res.sendStatus(500)
        }
    },
    create: async (req,res) =>{
        try{
            var rta = await createLanguage(req.body.userid, req.body.languages)
            res.send(rta)
        }catch(err){
            console.log(err)
            res.sendStatus(500)
        }
    },
    update: async (req,res) =>{
        try{
            await updateLanguage(req.body.id, req.body.languages)
            res.sendStatus(200)
        }catch(err){
            console.log(err)
            res.sendStatus(500)
        }
    },
    delete: async (req,res) =>{
        try{
            await deleteLanguage(req.params.id)
            res.sendStatus(200)
        }catch(err){
            console.log(err)
            res.sendStatus(500)
        }
    }
}

module.exports = languageController