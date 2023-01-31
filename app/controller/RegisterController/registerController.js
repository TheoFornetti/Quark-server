const { sendMail } = require("../../service/mailService/mailService")
const {temporal} = require("../../models/index")
const NodeRsa = require("node-rsa") 
const key = new NodeRsa({b: 512});
const { Exist, createTemporal, getTemporal, createMoodleUser, confirmUser, enrollUser } = require("../../service/registerService/registerService")


var registerController = {
    create: async (req, res)=>{
        
        try{
            console.log("alo")
            var user = req.body.user
            await Exist(user)
            await createTemporal(user)
            var username = user.username
            var id = await temporal.findAll({where:{email}})
            var ID = id[0].id
            // var ids = key.encrypt(ID, "base64" )
            
            await sendMail(user.email, "Confirmacion Cuenta", `http://34.71.113.200:3000/confirmRegisterDev/${ID}`)
            res.status(200).json({message: "Se envio un mail de confirmacion a " + user.email }) 
        }catch(e){
            console.log(e.message)
            res.status(400).json({message: e.message}) 
        } 
    },
    createMoodle: async (req,res)=>{
    //    try{
    //         // var id = key.decrypt(req.body.userid, 'utf8')
    //         console.log(id)
    //         var user = await getTemporal()
    //         await createMoodleUser(user)
    //         var id = await confirmUser(user)
    //         // await enrollUser(id)
    //         res.status(200).json("Se dio de alta al usuario")
    //    }catch(e){
    //         res.status(400).json({message: e.message})
    //    }
    }
    
}

module.exports = registerController