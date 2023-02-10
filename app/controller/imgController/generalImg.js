const { Storage } = require("@google-cloud/storage");
const { scholarshipType } = require("../../models/index");

const storage = new Storage({
  projectId: "servidor-prueba-plataforma",
  keyFilename: "servidor-prueba-plataforma-a3e26aa882ab.json",
});

const bucket = storage.bucket("quark-platform-vm-img-bucket");

const handleUpload = (file, cb) => {
  const fileExtension = file.originalname.split(".")[1];
  const fileName = file.originalname.split(".")[0];
  const fileName1 = fileName.split(" ").join("");
  const newFile = bucket.file(`${fileName1}-${Date.now()}.${fileExtension}`);

  console.log(newFile);

  const stream = newFile.createWriteStream({
    metadata: {
      contentType: file.mimetype,
    },
  });

  stream.on("error", (err) => {
    cb(err);
  });

  stream.on("finish", () => {
    console.log("Uploading");

    cb(null, {
      file: newFile,
      bucket: bucket.name,
    });
  });

  stream.end(file.buffer);

  return `https://storage.googleapis.com/quark-platform-vm-img-bucket/${newFile.id}`;
};

async function uploadGenaralImg(image, dbImg) {
  if (dbImg.includes("none")) {
    var rta = handleUpload(image, (err, data) => {
      if (err) {
        console.log(err.message);
        throw new Error("Error uploading image");
      }
    });

    return rta;
  } else {
    var fileName = dbImg.split("/")[4];

    bucket
      .file(fileName)
      .delete()
      .then(() => {
        console.log(`File ${fileName} deleted.`);
      })
      .catch((err) => {
        throw new Error("Error deleting image");
      });

    var rta = handleUpload(image, (err, data) => {
      if (err) {
        console.log(err.message);
        throw new Error("Error uploading image");
      }
    });

    return rta
  }
}

module.exports = uploadGenaralImg;
