const {
  createLanguage,
  deleteLanguage,
  updateLanguage,
  getLanguage,
} = require("../../service/userServices/languageService");

var languageController = {
  read: async (req, res) => {
    getLanguage(req.params.id)
      .then((language) => {
        res.status(200).json({language});
      })
      .catch((err) => {
        res.status(400).json({ msg: err.message });
      });
  },
  create: async (req, res) => {
    createLanguage(req.body.userid, req.body.languages)
      .then((language) => {
        res.status(200).json({ language, msg: "Se creo con exito!" });
      })
      .catch((err) => {
        res.send(200).json({ msg: err.message });
      });
  },
  update: async (req, res) => {
    updateLanguage(req.body.id, req.body.languages)
      .then(() => res.status(200).json({ msg: "se actualizo con exito!" }))
      .catch((err) => {
        res.status(400).json({ msg: err.message });
      });
  },
  delete: async (req, res) => {
    deleteLanguage(req.params.id)
      .then(res.status(200).json({ msg: "Se elimino con exito!" }))
      .catch((err) => {
        res.status(400).json({ msg: err.message });
      });
  },
};

module.exports = languageController;
