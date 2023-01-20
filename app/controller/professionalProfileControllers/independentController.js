const {
  createIndependent,
  updateIndependent,
  deleteIndependent,
  getIndependent,
} = require("../../service/userServices/independentService");

var independentController = {
  read: async (req, res) => {
    getIndependent(req.params.id)
      .then((independent) => {
        res.status(200).send(independent);
      })
      .catch((err) => {
        res.status(400).json({ msg: err.message });
      });
  },

  create: async (req, res) => {
    createIndependent(req.body.userid, req.body.independents)
      .then((independent) => {
        res.status(200).json({ independent, msg: "Se creo con exito!" });
      })
      .catch((err) => {
        res.status(400).json({ msg: err.message });
      });
  },

  update: async (req, res) => {
    var rta = updateIndependent(req.body.id, req.body.independents)
      .then(() => {
        res.status(200).json({ msg: "Se actualizo con exito!" });
      })
      .catch((err) => {
        res.status(400).json({ msg: err.message });
      });
  },

  delete: async (req, res) => {
    var rta = deleteIndependent(req.params.id)
      .then(() => {
        res.status(200).json({ msg: "Se elimino con exito!" });
      })
      .catch((err) => {
        res.status(400).json({ msg: err.message });
      });
  },
};

module.exports = independentController;
