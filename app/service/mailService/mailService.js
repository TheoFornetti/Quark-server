require('dotenv').config()
const sgMail = require ('@sendgrid/mail')
sgMail.setApiKey("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")

const sendMail = async (to, subject, text) =>{
    /*
    El msg se pasa asi
    {
        to:"theofornetti2001@gmail.com",
        from:"franco@quarkacademy.com.ar",
        subject:"Welcome",
        text:"Holaaa, que onda todo bien?"
    } */
    const from = "franco@quarkacademy.com.ar"
    const msg = {
        to, 
        from,
        subject,
        text
    }
    try {
        await sgMail.send(msg)
        console.log("Message sent successfully")
    } catch (err){
        console.log(err)
        if (err.response){
            console.error(err.response.body)
        }
    }
}

module.exports = {sendMail}