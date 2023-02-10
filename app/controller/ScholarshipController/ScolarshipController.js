const { manualEnrollment, passed, manualCourseEnrol, createScholarshipRegister, createScholarship, getScholarship, getUserScholarships, deleteScholarship, updateScholarshipImg } = require("../../service/ScholarshipService/ScholarshipService")
const uploadGenaralImg = require("../imgController/generalImg")

const {scholarshipType} = require("../../models/index")

var scholarshipController = {
    create: async(req,res)=>{
        
        try{
            console.log(req.body)
            console.log(req.file)
            // console.log(req.file)
            // var rta = await createScholarship(req.body.scholarship)
            
           
            res.status(200).json({msg: "Se creo la beca!"})
        }catch(err){
            res.status(500).json({msg: err.message})


        }
    },
    updateScholarshipImg: async (req,res)=>{
        var id = req.body.scholarshipTypeId
        
        try{
            var imgName = await scholarshipType.findAll({where:{id}})
            var img = await uploadGenaralImg(req.file, imgName[0].img)
            var updateImg = await updateScholarshipImg(img, id)

            
            res.status(200).json({msg: "Se actualizo con exito!"})
        }catch(err){
            res.status(500).json({msg: err.message})
        }
    },
    getScholarship: async(req,res)=>{
        try{
            var rta =await getScholarship(req.body.size, req.body.page)
            res.send(rta)
        }catch(err){
            res.status(500).json({ msg: err.message });
        }
    },
    getUserScholarships: async (req,res)=>{
        try{
            var rta = await getUserScholarships(req.body.courseList)
            res.status(200).send(rta)
        }catch(err){
            res.status(500).json({msg: err.message})
        }
    },
    delete: (req,res)=>{
        try{
            deleteScholarship(req.params.id)
            res.status(200).json({msg: "Se elimino con exito!"})
        }catch(err){
            res.status(500).json({msg: "Fallo, intente de nuevo"})
        }
    },
    courseEnrol: async (req,res)=>{
        
        try{
            var pass = await passed(req.body.userid, req.body.courseid)
            var courses = await createScholarshipRegister(req.body.userid, req.body.scholarshipTypeId, pass)
            var final = await manualCourseEnrol(req.body.userid, courses, pass)
            res.status(200).json({msg: final})
        }catch(err){
            res.status(500).json({msg: err.message})
        }
    }
}

module.exports = scholarshipController