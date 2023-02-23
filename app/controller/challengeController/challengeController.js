const {createQuestionnaire, deleteQuestionnaire, getQuestionnaire, getAllQuestionnaires, correctQuestionnaire, updateQuestionnaire} = require("../../service/challengeService/challengeService")

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
            var rta = await getQuestionnaire(req.params.id)
            res.status(200).send(rta)
        }catch(err){
            res.status(500).json({msg: err.message})
        }
    },
    getAll:async (req,res) =>{

        try{
            var rta = await getAllQuestionnaires(req.body.size, req.body.page)
            res.status(200).send(rta)
        }catch(err){
            res.status(500).json({msg: err.message})
        }
    },
    correctExam: async (req,res)=>{
        console.log(req.body)
        try{
            var rta = await correctQuestionnaire(req.body.userid,req.body.grade,req.body.scholarshipid)
            res.status(200).json({msg: rta.msg, bool: rta.bool})
        }catch(err){
            res.status(500).json({msg: err.message}) 
        }
    },
    update: async (req,res) => {
        try{
            await updateQuestionnaire(req.body,id ,req.body.name, req.body.questionList)
            res.status(200).json({msg: "Desafio actualizado!"})
        }catch(err){
            res.status(500).json({msg: err.message})
        }
    }
}

module.exports = challengeController 