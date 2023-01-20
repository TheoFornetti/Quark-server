const {Router} = require("express")
const multer = require('multer');
const userImgController = require("../../controller/imgController/userImgController");
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // no larger than 5mb
    },
});
const userImgRouter = Router()

userImgRouter.post("/upload", upload.single('file'), userImgController.uploadImg)


module.exports = userImgRouter