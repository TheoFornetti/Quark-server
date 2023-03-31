const devolverUsuarioCurso = require("../../service/creacionUsuario/agregarCursos");
const retornarInsignia = require("../../service/creacionUsuario/agregarInsignias");
const devolverUsuario = require("../../service/creacionUsuario/crearUsuario");
const mostrarImg = require("../../service/creacionUsuario/img");
const { userBasicData, professionalProfile } = require("../../models/index");
const {
  createUser,
  updateUser,
  getProfessionalProfile,
  getUserFullInfo,
  updateScore,
  careerSelector,
} = require("../../service/userServices/professionalProfileService");

var userController = {
  getInfo: async (req, res) => {
    getUserFullInfo(req.params.id)
      .then((user) => res.send(user))
      .catch((err) => res.status(400).json({ msg: err.message }));
  },
  createOrUpdate: async (req, res) => {
    var professionalProfileId = req.body.userid;
    var rta = await userBasicData.findAll({ where: { professionalProfileId } });

    if (rta.length == 0) {
      createUser(professionalProfileId, req.body.userGeneralData)
        .then((user) => {
          res.status(200).json({ msg: "Se creo el usuario" });
        })
        .catch((err) => {
          res.status(400).json({ msg: err.message });
        });
    } else {
      updateUser(req.body.userid, req.body.userGeneralData)
        .then((item) => {
          res.status(200).json({ msg: "Se actualizo correctamente!" });
        })
        .catch((err) => {
          if (err.message.includes("Validation error")) {
            res.status(400).json({ msg: "El nickName esta en uso!" });
          } else {
            res.status(400).json({ msg: err.message });
          }
        });
    }
  },
  getMoodleInfo: (req, res) => {
    var email = req.params.email;

    if (email != "favicon") {
      devolverUsuario(email)
        .then(async (usuario) => {
          console.log("paso 1");
          await devolverUsuarioCurso(usuario)
            .then(async (usuarioCursos) => {
              console.log("paso 2");
              await mostrarImg(usuarioCursos)
                .then(async (usuarioCursosImg) => {
                  console.log("Paso 3");
                  await retornarInsignia(usuarioCursosImg)
                    .then(async (moodleUserData) => {
                      var professionalProfileId = moodleUserData.id;
                      var rta = await professionalProfile.findAll({
                        where: { id: professionalProfileId },
                      });

                      if (rta.length == 0) {
                        var nickName = "user" + professionalProfileId;
                        //Create user and sesskey
                        var rta = await professionalProfile.create({
                          id: professionalProfileId,
                        });
                        //crear usuario
                        await createUser(professionalProfileId, {
                          nickname: nickName,
                        });
                      }

                      careerSelector(
                        moodleUserData.listaCurso,
                        moodleUserData.id
                      );

                      var moodleData = { moodleUserData };
                      console.log(moodleData);
                      console.log("sadfsd");
                      res.send(moodleData);
                    })
                    .catch((err) => res.status(400).json({ msg: err.message }));
                })
                .catch((err) => res.status(400).json({ msg: err.message }));
            })
            .catch((err) => res.status(400).json({ msg: err.message }));
        })
        .catch((err) => res.status(400).json({ msg: err.message }));
    }
  },
  updateUserInfo: (req, res) => {
    if (req.body.userGeneralData.firstname == "") {
      res.status(400).json({ msg: "El nombre no puede estar vacío" });
    } else if (req.body.userGeneralData.lastname == "") {
      res.status(400).json({ msg: "El apellido no puede estar vacío" });
    } else if (req.body.userGeneralData.nickname == "") {
      res.status(400).json({ msg: "El nickname no puede estar vacío" });
    } else if (req.body.userGeneralData.idnumber == "") {
      res.status(400).json({ msg: "El número de identificación personal no puede estar vacío" });
    } else {
      updateUser(req.body.userid, req.body.userGeneralData)
        .then((item) => {
          res.status(200).json({ msg: "Se actualizo correctamente!" });
        })
        .catch((err) => {
          if (err.message.includes("Validation error")) {
            res.status(400).json({ msg: "El nickname está en uso" });
          } else {
            res.status(400).json({ msg: err.message });
          }
        });
    }
  },
};

module.exports = userController;
