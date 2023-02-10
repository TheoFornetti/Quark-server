const jwt = require("jsonwebtoken")


var loginController = {
    createToken: (req,res)=>{
        userid = req.body.id
        
        try {
            jwt.sign({ userid }, "secretkey", { expiresIn: "6h" }, (err, token) => {
                
                res.cookie("QuarkSession", token,{
                  
                    sameSite: "lax"
                }) 
                res.sendStatus(200)
                
            });
        } catch (err) {
            res.json({
                message: "No se pudo crear el Token",
            });
        }
    }
}

module.exports = loginController