const { Storage } = require("@google-cloud/storage");
const { userBasicData } = require("../../models/index");

const storage = new Storage({
  projectId: "servidor-prueba-plataforma",
  keyFilename: "servidor-prueba-plataforma-a3e26aa882ab.json",
});

const bucket = storage.bucket("quark-platform-vm-img-bucket");

const handleUpload = (req, file, cb) => {
  const fileExtension = file.originalname.split(".")[1];
  const fileName = file.originalname.split(".")[0];
  const fileName1 =  fileName.split(" ").join("")
  const newFile = bucket.file(`${fileName1}-${Date.now()}.${fileExtension}`);
  const stream = newFile.createWriteStream({
    metadata: {
      contentType: file.mimetype,
    },
  });

  stream.on("error", (err) => {
    cb(err);
  });

  stream.on("finish", () => {
    console.log("Uploading")
    let professionalProfileId = req.body.userid;
    userBasicData
      .update(
        {
          imgUrl: `https://storage.googleapis.com/quark-platform-vm-img-bucket/${newFile.id}`,
        },
        { where: { professionalProfileId } }
      )
      .then(() => {
        cb(null, {
          file: newFile,
          bucket: bucket.name,
        });
      });
  });

  stream.end(file.buffer);
};

var userImgController = {
  uploadImg: async (req, res) => {
    var professionalProfileId = req.body.userid;
    var url = await userBasicData.findAll({ where: { professionalProfileId } });
   
    if (
      url[0].imgUrl.includes(
        "https://storage.googleapis.com/quark-platform-vm-img-bucket/blank-profile-picture.webp"
      )
    ) {
      console.log("Se Actualiza");
      handleUpload(req, req.file, (err, data) => {
        if (err) {
          console.log(err.message);
          res.status(500).send({ error: "Error uploading image"  });
        }else {
          userBasicData
            .findAll({ where: { professionalProfileId } })
            .then((url) => res.status(200).send(url[0].imgUrl));
          
        }
      });
    } else {
      console.log(url[0].imgUrl)
      var fileName = url[0].imgUrl.split("/")[4]
      console.log(fileName)
      
      bucket.file(fileName).delete().then(() => {
          console.log(`File ${fileName} deleted.`);
        }).catch((err) => {
          res.send(err.message);
        });

        handleUpload(req, req.file, (err, data) => {
            if (err) {
              console.log(err.message);
              res.status(500).send({ error: "Error uploading image" });
            } else {
              userBasicData
                .findAll({ where: { professionalProfileId } })
                .then((url) => res.status(200).send(url[0].imgUrl));
              
            }
          });
    }
  },
};

module.exports = userImgController;
