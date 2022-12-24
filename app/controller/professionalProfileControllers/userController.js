const devolverUsuarioCurso = require("../../service/creacionUsuario/agregarCursos");
const retornarInsignia = require("../../service/creacionUsuario/agregarInsignias");
const devolverUsuario = require("../../service/creacionUsuario/crearUsuario");
const mostrarImg = require("../../service/creacionUsuario/img");
const {
  createUser,
  updateUser,
  getProfessionalProfile,
} = require("../../service/userServices/professionalProfileService");

var userController = {
  getInfo: async (req, res) => {
    try {
      var rta = await getProfessionalProfile(req.body.id);
      res.send(rta);
    } catch (err) {
      throw err;
    }
  },
  create: (req, res) => {
    try {
      createUser(
        req.body.id,
        req.body.biography,
        req.body.score,
        req.body.nickname,
        req.body.birthdate
      );
      res.sendStatus(200);
    } catch (err) {
      throw err;
    }
  },
  update: (req, res) => {
    try {
      updateUser(
        req.body.id,
        req.body.biography,
        req.body.score,
        req.body.nickname,
        req.body.birthdate
      );
      res.sendStatus(200);
    } catch (err) {
      throw err;
    }
  },
  getMoodleInfo: (req, res) => {
    var email = req.params.email;
    if (email != "favicon") {
      devolverUsuario(email).then(async (usuario) => {
        console.log("paso 1");
        await devolverUsuarioCurso(usuario).then(async (usuarioCursos) => {
          console.log("paso 2");
          await mostrarImg(usuarioCursos).then(async (usuarioCursosImg) => {
            console.log("Paso 3");
            await retornarInsignia(usuarioCursosImg).then((usuarioCompleto) => {
              res.send(usuarioCompleto);
            });
          });
        });
      });
    }
  },
  getMoodleInfoId: (req, res) => {
    var email = parseInt(req.params.id);
    devolverUsuario(email).then(async (usuario) => {
      console.log("paso 1");
      await devolverUsuarioCurso(usuario).then(async (usuarioCursos) => {
        console.log("paso 2");
        await mostrarImg(usuarioCursos).then(async (usuarioCursosImg) => {
          console.log("Paso 3");
          await retornarInsignia(usuarioCursosImg).then((usuarioCompleto) => {
            res.send(usuarioCompleto);
          });
        });
      });
    });
  },
};

module.exports = userController;
