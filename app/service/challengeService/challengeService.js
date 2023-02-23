const {
  questionnaire,
  question,
  answer,
  scholarshipCourses,
} = require("../../models/index");
const {
  manualCourseEnrol, createScholarshipRegister,
} = require("../ScholarshipService/ScholarshipService");

async function createQuestionnaire(challengeName, questionList) {
  try {
    var rta = await questionnaire.create({
      name: challengeName,
    });

    questionList.forEach(async (questions) => {
      var rta1 = await question.create({
        // img: questions.img,
        name: questions.name,
        questionnaireId: rta.id,
      });

      questions.answerList.forEach(async (answers) => {
        await answer.create({
          name: answers.name,
          isCorrect: answers.correct,
          questionId: rta1.id,
          questionnaireId: rta.id,
        });
      });
    });
  } catch (err) {
    throw new Error(err.message);
  }
}

async function updateQuestionnaire(id, challengeName, questionList) {
  try{
    await deleteQuestionnaire(id)
    await createQuestionnaire(challengeName, questionList)
  } catch (err) {
    throw new Error(err.message);
  }
}

async function deleteQuestionnaire(id) {
  try {
    questionnaireId;
    var questionnaireId = id;
    await answer.destroy({ where: { questionnaireId } });
    await question.destroy({ where: { questionnaireId } });
    await questionnaire.destroy({ where: { id } });
  } catch (err) {
    throw new Error(err.message);
  }
}

async function getQuestionnaire(id) {
  var options = {
    where: { id },
    include: [{ model: question, include: [answer] }],
  };
  var questionnaireObject = await questionnaire.findAll(options);
  function getUniqueRandomArrayElements(arr, numElements) {
    if (arr.length < numElements) {
      return arr;
    }

    const result = [];
    const usedIndexes = [];

    for (let i = 0; i < numElements; i++) {
      let randomIndex = Math.floor(Math.random() * arr.length);
      while (usedIndexes.includes(randomIndex)) {
        randomIndex = Math.floor(Math.random() * arr.length);
      }
      usedIndexes.push(randomIndex);
      result.push(arr[randomIndex]);
    }

    return result;
  }

  const randomElements = getUniqueRandomArrayElements(questionnaireObject[0].questions, 10)
  let rta = {
    name: questionnaireObject[0].name,
    questions: randomElements,
  };
  return rta;
}

async function getAllQuestionnaires(size, page) {
  var options = {
    limit: +size,
    offset: +page * +size,
    include: [{ model: question, include: [answer] }],
  };
  var { count: questionnaireCount, rows } = await questionnaire.findAndCountAll(
    options
  );
  var returnObject = {
    count: questionnaireCount,
    rows,
  };
  return returnObject;
}

async function correctQuestionnaire(userId, grade, scholarshipTypeId) {
  try {
    var courseList = []
    var courses = await scholarshipCourses.findAll({
      where: { scholarshipTypeId },
    });
    courses.forEach(course => {
      courseList.push(course.courseId)
    })
    
    var scholarship = await createScholarshipRegister(userId,scholarshipTypeId,grade)
    var rta = await manualCourseEnrol(userId, courseList, grade)

    return rta
  } catch (err) {
    throw new Error(err.message);
  }
}
module.exports = {
  createQuestionnaire,
  deleteQuestionnaire,
  getQuestionnaire,
  getAllQuestionnaires,
  correctQuestionnaire,
  updateQuestionnaire
};
