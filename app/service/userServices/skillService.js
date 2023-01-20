const { studentSkills, userBasicData, skill } = require("../../models/index");
const { Op } = require("sequelize");

async function getSkill(professionalProfileId) {
  var options = {
    where: { professionalProfileId },
    include: [skill],
  };
  var rta = await studentSkills.findAll(options);
  return rta;
}

async function createSkill(professionalProfileId, skill) {
  var rta = await studentSkills.create({
    score: skill.score,
    professionalProfileId,
    skillId: skill.id,
  });

  console.log(professionalProfileId);
  var id = professionalProfileId;
  var score = await updateScore(id);

  var skillObject = {
    rta,
    score,
  };

  return skillObject;
}

async function updateSkill(id, skill) {
  var rta = await studentSkills.update(
    {
      score: skill.score,
      skillId: skill.id,
    },
    { where: { id } }
  );

  var score = await updateScore(id);

  return score;
}

async function deleteSkill(id) {
  var user = await studentSkills.findAll({ where: { id } });

  var rta = await studentSkills.destroy({
    where: { id },
  });

  console.log(user[0].professionalProfileId);

  var score = await updateScore(user[0].professionalProfileId);

  return score;
}

async function updateScore(id) {
  console.log(id);
  var professionalProfileId = id;
  var skillSum = 0;
  var skills = await getSkill(id);

  skills.forEach((skill) => {
    skillSum = skillSum + skill.score;
  });

  var rta = await userBasicData.update(
    {
      score: skillSum,
    },
    { where: { professionalProfileId } }
  );

  var score = { skillSum };
  return score;
}

module.exports = { getSkill, createSkill, updateSkill, deleteSkill };
