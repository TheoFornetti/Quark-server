const {questionnaire, question, answer} = require("../../models/index")


async function createQuestionnaire(challengeName, questionList){
    try{
        var rta = await questionnaire.create({
            name: challengeName
        })


        questionList.forEach(async questions => {
            var rta1 = await question.create({
                // img: questions.img,
                name: questions.name,
                questionnaireId: rta.id
            })

            

            questions.answerList.forEach( async answers =>{
                await answer.create({
                    name: answers.name,
                    isCorrect: answers.correct,
                    questionId: rta1.id,
                    questionnaireId: rta.id

                })
            })

        });
    }catch(err){
        throw new Error(err.message)
    }

}

async function deleteQuestionnaire(id){
    try{	
        
        questionnaireId
        var questionnaireId = id
        await answer.destroy({where:{questionnaireId}})
        await question.destroy({where:{questionnaireId}})
        await questionnaire.destroy({where: {id}})
        
        
    }catch(err){
        throw new Error(err.message)
    }
}

async function getQuestionnaire(id){
    try{
        var rta = questionnaire.findAll({where:{id}, inlude:[{model:question, include:[{model:answer}]}]})
        return rta
    }catch(err){

    }
}

module.exports= {createQuestionnaire, deleteQuestionnaire, getQuestionnaire}