const express = require("express");
const cors = require("cors")
const fetch = require("node-fetch")
const {sequelize } = require("./models/index");
const loginRoutes = require("./routes/login");
const cookieParser = require("cookie-parser")
const academicsRoutes = require("./routes/professionalProfile/academicsActivitys");
const independetRoutes = require("./routes/professionalProfile/independentActivitys");
const laborsRoutes = require("./routes/professionalProfile/laborsActivitys");
const languageRouter = require("./routes/professionalProfile/language");
const sesskeyRoutes = require("./routes/professionalProfile/sesskey");
const skillRoutes = require("./routes/professionalProfile/skill");
const userRoutes = require("./routes/professionalProfile/userRoutes");
const ParametersRoutes = require("./routes/professionalProfile/skillParameter");
const eventsRoutes = require("./routes/EventsRoutes/eventRoutes");
const studentEventRoutes = require("./routes/EventsRoutes/studentEventRoutes");
const newsRoutes = require("./routes/newsRoutes/newsRoutes");
const tagRoutes = require("./routes/EventsRoutes/tagsRoutes");
const userImg = require("./routes/imgRoutes/userImgRoutes");
const registerRoutes = require("./routes/Register/registerRoutes");


const Port = process.env.PORT || 8080

const app = express();
app.use(cors({
    origin: ["http://localhost:3000"],
    methods:["GET","POST","PUT","DELETE","UPDATE"],
    credentials: true
}))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())

app.use("/user", userRoutes)
app.use("/sesskey",sesskeyRoutes)
app.use("/login",loginRoutes)
app.use("/academics",academicsRoutes)
app.use("/labors", laborsRoutes)
app.use("/independents", independetRoutes)
app.use("/skills", skillRoutes)
app.use("/languages", languageRouter)
app.use("/parameters", ParametersRoutes)
app.use("/events", eventsRoutes)
app.use("/studentEvents", studentEventRoutes)
app.use("/news", newsRoutes)
app.use("/tags", tagRoutes)
app.use("/userImg", userImg)
app.use("/registro", registerRoutes)


app.listen(Port, (req,res)=>{
    sequelize.sync({force:false}).then(()=>{
        console.log("Connection has been stablish")
    }).catch(err=>{
        console.log(err)
    })
    
    console.log("Working on port: " + Port)
})
