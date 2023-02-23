const {
  createLabors,
  updateLabors,
  deleteLabors,
  getLabors,
} = require("../../service/userServices/laborsService");

var laborController = {
  read: async (req, res) => {
    getLabors(req.params.id)
      .then((labors) => {
        res.status(200).send(labors);
      })
      .catch((err) => {
        res.status(400).json({ msg: err.message });
      });
  },
  create: async (req, res) => {
    if(req.body.labors.endDate == '') {
      req.body.labors.endDate = undefined
    }
    createLabors(req.body.userid, req.body.labors)
      .then((labors) => {
        res.status(200).json({ labors, msg: "Se creo con exito!" });
      })
      .catch((err) => {
        res.status(400).json({ msg: err.message });
      });
  },
  update: async (req, res) => {
    if(req.body.labors.endDate == '') {
      req.body.labors.endDate = undefined
    }
    updateLabors(req.body.id, req.body.labors)
      .then(() => {
        res.status(200).json({ msg: "Se actualizo con exito!" });
      })
      .catch((err) => {
        res.status(400).json({ msg: err.message });
      });
  },

  delete: async (req, res) => {
    deleteLabors(req.params.id)
      .then(res.status(200).json({ msg: "Se elimino con exito!" }))
      .catch((err) => {
        res.status(400).json({ msg: err.message });
      });
  },
};

module.exports = laborController;
