const {createQuestionnaire, deleteQuestionnaire, getQuestionnaire} = require("../../service/challengeService/challengeService")

var challengeController = {
    create: async (req,res) => {
        try{
            
            await createQuestionnaire(req.body.name, req.body.questionList)
            res.status(200).json({msg: "Desafio creado con exito!"})
        }catch(err){
            res.status(500).json({msg: err.message})
        }
    },
    delete: async (req,res) =>{
        try{
            await deleteQuestionnaire(req.params.id)
            res.status(200).json({msg: "Se elimino con exito!"})
        }catch(err){
            res.status(500).json({msg: err.message})
        }
    },
    get:async (req,res) =>{

        try{
            console.log("Hola")
            var rta = await getQuestionnaire(req.params.id)
            res.status(200).send(rta)
        }catch(err){
            res.status(500).json({msg: err.message})
        }
    }
}

module.exports = challengeController