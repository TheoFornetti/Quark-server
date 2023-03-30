const { news } = require("../../models/index");
const { courseNews } = require("../../models/index");
const fetch = require("node-fetch");
const { use } = require("../../routes/login");

async function getAllNews(size, page) {
  try {
    let options = {
      limit: +size,
      offset: +page * +size,
    };

    const { count, rows } = await news.findAndCountAll(options);

    var page = {
      amount: count,
      data: rows,
    };

    return page;
  } catch (err) {
    return err;
  }
}

async function getMoodleCourses() {
  try {
    var courseList = [];
    var response = await fetch(
      `${process.env.VM_IP}/moodle/webservice/rest/server.php?wstoken=de19f86bde31dfb08f817681f4414238&wsfunction=core_course_get_courses&moodlewsrestformat=json`
    );

    var data = await response.json();

    data.forEach((course) => {
      var course = {
        id: course.id,
        name: course.shortname,
      };

      courseList.push(course);
    });

    return courseList;
  } catch (err) {
    return err;
  }
}

async function createNew(newObject) {
  var rta = await news.create({
    title: newObject.title,
    content: newObject.content,
    endDate: newObject.endDate,
  });

  if(newObject.courseList.length > 0){
    newObject.courseList.forEach(async (course) => {
      await courseNews.create({
        newsId: rta.id,
        courseId: course,
      });
    });
  }

  return rta;
}

async function getNews(listaCurso) {
  try {
    var userEvents = [];
    var userNews = [];
    var rta = await news.findAll({ include: courseNews });

    rta.forEach((newsObject) => {
      newsObject.courseNews.forEach((course) => {
        listaCurso.forEach(async (courseId) => {
          if (courseId == course.courseId) {
            userEvents.push(newsObject.id);
          }
        });
      });
    });

    let unicos = new Set(userEvents);
    let arrayUnic = [...unicos];

    for (var i = 0; i < arrayUnic.length; i++) {
      var rta1 = await news.findByPk(arrayUnic[i]);
      var newsDate = new Date(rta1.endDate);
      var actualDate = new Date();

      if (newsDate > actualDate) {
        userNews.push(rta1);
      }
    }

    return userNews;
  } catch (err) {
    return err;
  }
}

async function updateNews(id, newObject) {
  try {
    var rta = await news.update(
      {
        title: newObject.title,
        content: newObject.content,
        endDate: newObject.endDate,
      },
      { where: { id } }
    );

    await courseNews.destroy({ where: { newsId: id } });

    newObject.courseList.forEach(async (course) => {
      await courseNews.create({
        newsId: id,
        courseId: course,
      });
    });
  } catch (err) {
    return err;
  }
}

async function deleteNews(id) {
  var rta = news.destroy({ where: { id } });
  return rta;
}

module.exports = {
  createNew,
  getMoodleCourses,
  getNews,
  getAllNews,
  updateNews,
  deleteNews,
};
