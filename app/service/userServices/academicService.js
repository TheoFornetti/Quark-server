const { academicActivity } = require("../../models/index");
async function getAcademics(professionalProfileId) {
  var rta = academicActivity.findAll({
    where: { professionalProfileId },
  });
  return rta;
}

async function createAcademics(professionalProfileId, academics) {
  var rta = academicActivity.create({
    institution: academics.institution,
    beginDate: academics.beginDate,
    endDate: academics.endDate,
    state: academics.state,
    title: academics.title,
    professionalProfileId,
  });

  return rta;
}

async function updateAcademics(id, academics) {
  var rta = academicActivity.update(
    {
      institution: academics.institution,
      beginDate: academics.beginDate,
      endDate: academics.endDate,
      state: academics.state,
      title: academics.title,
    },
    {
      where: { id },
    }
  );
  return rta;
}

async function deleteAcademics(id) {
  

  var rta = academicActivity.destroy({
    where: { id },
  });

  return rta;
}

module.exports = {
  getAcademics,
  createAcademics,
  updateAcademics,
  deleteAcademics,
};
