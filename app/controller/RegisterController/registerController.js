const { sendMail } = require("../../service/mailService/mailService")
const {temporal} = require("../../models/index")
const NodeRsa = require("node-rsa") 
const key = new NodeRsa({b: 512});
const { Exist, createTemporal, getTemporal, createMoodleUser, confirmUser, enrollUser, addIdNumber } = require("../../service/registerService/registerService");
const { where } = require("sequelize");


var registerController = {
    create: async (req, res)=>{
        
        try{
            var user = req.body.user
            //Busca si el mail o username esta en uso
            await Exist(user)
            //Crea registro en la tabla temporal
            await createTemporal(user)
            var username = user.username
            var id = await temporal.findAll({where:{username}})
            var ID = id[0].id
            // var ids = key.encrypt(ID, "base64" )
            
            await sendMail(user.email, "Confirmacion Cuenta", `http://34.66.2.129:3030/register/moodleSingUp/${ID}`)
            res.status(200).json({message: "Se envio un mail de confirmacion a " + user.email }) 
        }catch(e){
            console.log(e.message)
            res.status(400).json({message: e.message}) 
        } 
    },
    createMoodle: async (req,res)=>{
       try{
            var id = req.params.id
            console.log(id)
            var user = await getTemporal(req.params.id)
            await createMoodleUser(user)
            var moodleUserId = await confirmUser(user)
            await addIdNumber(moodleUserId, user)
            await temporal.destroy({where: {id}})
            res.status(200).send("Se dio de alta al usuario")
       }catch(e){
            res.status(400).json({message: e.message})
       }
    }
    
}

module.exports = registerController