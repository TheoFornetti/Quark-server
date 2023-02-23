const {Router} = require("express")
const scholarshipController = require("../../controller/ScholarshipController/ScolarshipController")
const scholarshipRoutes = Router()
const multer = require('multer');
const verifyToken = require("../../middlewares/auth");

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // no larger than 5mb
    },
});

// scholarshipRoutes.post("/", scholarshipController.enrol)
scholarshipRoutes.post("/create", upload.single('file'), verifyToken, scholarshipController.create)
scholarshipRoutes.post("/getScholarship", scholarshipController.getScholarship)
scholarshipRoutes.post("/getUserScholarships", scholarshipController.getUserScholarships)
scholarshipRoutes.post("/passed", scholarshipController.courseEnrol)
scholarshipRoutes.put("/update", upload.single('file'), verifyToken, scholarshipController.update)
//scholarshipRoutes.put("/updateImg",upload.single('file'), scholarshipController.updateScholarshipImg)
scholarshipRoutes.delete("/delete/:id", verifyToken, scholarshipController.delete)

module.exports = scholarshipRoutes
