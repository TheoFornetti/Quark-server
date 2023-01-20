const {
  createNew,
  getMoodleCourses,
  getNews,
  getAllNews,
  updateNews,
  deleteNews,
} = require("../../service/newsService/newsService");

var newsController = {
  getMoodleData: async (req, res) => {
    try {
      var rta = await getMoodleCourses();
      res.send(rta);
    } catch (err) {
      res.send(500);
    }
  },
  create: async (req, res) => {
    var rta = createNew(req.body.news)
      .then((news) => {
        res.status(200).json({ news, msg: "Se creo con exito!" });
      })
      .catch((err) => {
        res.status(400).json({ msg: err.message });
      });
  },
  getPlatformNews: async (req, res) => {
    try {
      var rta = await getNews(req.body.listaCurso);
      res.send(rta);
    } catch (err) {
      res.status(400).json({ msg: err.message });
    }
  },
  GetAllNews: async (req, res) => {
    try {
      var rta = await getAllNews(req.body.size, req.body.page);
      res.send(rta);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  update: async (req, res) => {
    try {
      await updateNews(req.body.newsId, req.body.news);
      res.status(200).json({ msg: "Se actualizo con exito!" });
    } catch (err) {
      res.sendStatus(500);
    }
  },
  delete: async (req, res) => {
    deleteNews(req.params.id)
      .then(() => {
        res.status(200).json({ msg: "Se elimino con exito" });
      })
      .catch((err) => {
        res.status(400).json({ msg: err.message });
      });
  },
};

module.exports = newsController;
