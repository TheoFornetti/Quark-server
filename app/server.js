const express = require("express");
const fetch = require("node-fetch")
const {sequelize } = require("./models/index");
const loginRoutes = require("./routes/login");
const academicsRoutes = require("./routes/professionalProfile/academicsActivitys");
const independetRoutes = require("./routes/professionalProfile/independentActivitys");
const laborsRoutes = require("./routes/professionalProfile/laborsActivitys");
const sesskeyRoutes = require("./routes/professionalProfile/sesskey");
const userRoutes = require("./routes/professionalProfile/userRoutes");

const Port = process.env.port || 3030

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/user", userRoutes)
app.use("/sesskey",sesskeyRoutes)
app.use("/login",loginRoutes)
app.use("/academics",academicsRoutes)
app.use("/labors", laborsRoutes)
app.use("/independents", independetRoutes)

app.listen(Port, ()=>{
    sequelize.sync({force:false}).then(()=>{
        console.log("Connection has been stablish")
    }).then()
    console.log("Working on port: " + Port)
})
