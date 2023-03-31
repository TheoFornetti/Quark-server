const express = require("express")
const mysql = require("mysql2")
const app = express();

app.use(express.urlencoded({extended:false}))
app.use(express.json())
let conexion

conexion = mysql.createConnection({

    user: process.env.MOODLE_USERNAME ,
    password: process.env.MOODLE_PASSWORD,
    database: process.env.MOODLE_DATABASE,
    host: process.env.MOODLE_HOST,
    
})

const funciona = () => {
    conexion.connect((err => {
        if(err) throw err
        console.log('Conectado')
    }))
}



function obtenerInfo (userid){
    
   let listaFechas = [];

   return new Promise((resolve, reject) => {
        conexion.query(`SELECT *
        FROM mdl_course_completions where userid = ${userid}`, (err, r)=>{
            if (err) return reject         
            listaFechas.push(r)
            return resolve(listaFechas[0])
        })
    })

}




async function ObtenerData(userid){
    try {
        const data = await obtenerInfo(userid); // almacenamos el resultado por si queremos trabajar con el mismo
        return data
    } catch(err) {
        console.log(err);
    }
}

funciona()

module.exports = ObtenerData


