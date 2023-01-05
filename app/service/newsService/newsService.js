const {news} = require("../../models/index")
const {courseNews} = require("../../models/index")
const fetch = require("node-fetch")

async function getAllNews(){
    var rta = await news.findAll()

    return rta
} 


async function getMoodleCourses(){
    var courseList = []
    var response = await fetch("https://quark.academy/webservice/rest/server.php?wstoken=11e282e69970c31ed54f38925921b88f&wsfunction=core_course_get_courses&moodlewsrestformat=json")

    var data = await response.json()

    data.forEach(course=>{
        var course = {
            id: course.id,
            name: course.shortname
        }

        courseList.push(course)
    })

    return courseList
}

async function createNew(newObject){
    var rta = await news.create({
        title: newObject.title,
        content: newObject.content,
        endDate: newObject.endDate
    })

    newObject.courseList.forEach(async course=>{
        await courseNews.create({
            newsId: rta.id,
            courseId: course
        })
    })

}

async function getNews(user){
    var userEvents = []
    var userNews = []
    var rta = await news.findAll({include: courseNews})

    console.log(user.listaCurso)


    rta.forEach(newsObject =>{
       newsObject.courseNews.forEach(course=>{
            user.listaCurso.forEach(async courseId =>{  
                if(courseId == course.courseId){
                   userEvents.push(newsObject.id)
                }
            })
       })
        
    })

    for(var i=0; i<userEvents.length; i++){
        var rta1 = await news.findByPk(userEvents[i])
        userNews.push(rta1)
    }

   

   return userNews

    
}

async function updateNews(newObject){
    var rta = await news.update({
        title: newObject.title,
        content: newObject.content,
        endDate: newObject.endDate
    }, {where:{id:newObject.newsId}})

    await courseNews.destroy({where:{newsId:newObject.newsId}})

    newObject.courseList.forEach(async course=>{
        await courseNews.create({
            newsId: newObject.newsId,
            courseId: course
        })
    })
}

module.exports = {createNew, getMoodleCourses,getNews, getAllNews, updateNews}