const {
  createAcademics,
  updateAcademics,
  deleteAcademics,
  getAcademics,
} = require("../../service/userServices/academicService");

var academicController = {
  read: async (req, res) => {
    getAcademics(req.params.id)
      .then((academics) => {
        res.status(200).send(academics);
      })
      .catch((err) => {
        res.status(400).json({ msg: err.message });
      });
  },
  create: async (req, res) => {
    createAcademics(req.body.userid, req.body.academics)
      .then((academic) => res.status(200).send(academic))
      .catch((err) => {
        res.status(400).json({ msg: err.message });
      });
  },
  update: async (req, res) => {
    updateAcademics(req.body.id, req.body.academics)
      .then(() => res.status(200).json({ msg: "Se actualizo con exito" }))
      .catch((err) => {
        res.status(400).json({ msg: err.message });
      });
  },
  delete: async (req, res) => {
    deleteAcademics(req.params.id)
      .then(() => {
        res.status(200).json({ msg: "Se elimino con exito!" });
      })
      .catch((err) => {
        res.status(400).json({ msg: err.message });
      });
  },
};

module.exports = academicController;
