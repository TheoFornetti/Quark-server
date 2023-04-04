const {
  getMoodleCourses,
} = require("../../service/coursesService/coursesService");

let coursesController = {
  getCoursesLists: async (req, res) => {
    try {
      
      var rta = await getMoodleCourses(req.body.listaCursos);
      res.status(200).json({ rta });
    } catch (err) {
      res.status(400).json({ msg: err.message });
    }
  },
};

module.exports = {
  coursesController,
};
