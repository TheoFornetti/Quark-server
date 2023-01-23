const { Exist, createTemporal } = require("../../service/registerService/registerService")


var registerController = {
    create: async (req, res)=>{
        
        try{
            var user = req.body.user
            await Exist(user)
            await createTemporal(user)

            res.status(200).json({message: "Se envio un mail de confirmacion a " + user.email }) 
    
        }catch(e){
            res.status(400).json({message: e.message}) 
        } 
    }
    
}

module.exports = registerController