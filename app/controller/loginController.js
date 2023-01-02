const jwt = require("jsonwebtoken")


var loginController = {
    createToken: (req,res)=>{
        userid = req.body.id
        console.log(req.cookies)
        res.cookie("myCookieName", "Prueba",{
            
            sameSite: "lax"
        })
        res.sendStatus(200)
        // try {
        //     jwt.sign({ userid }, "secretkey", { expiresIn: "6h" }, (err, token) => {
        //         res.json({
        //             token,
        //         });
        //     });
        // } catch (err) {
        //     res.json({
        //         message: "No se pudo crear el Token",
        //     });
        // }
    }
}

module.exports = loginController