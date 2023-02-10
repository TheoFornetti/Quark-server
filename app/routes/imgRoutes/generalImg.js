const {Router} = require("express")
const multer = require('multer');

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // no larger than 5mb
    },
});
const generalImgRouter = Router()

generalImgRouter.post("/upload", upload.single('file'), )



module.exports = generalImgRouter