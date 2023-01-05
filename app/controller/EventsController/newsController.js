const { createNew, getMoodleCourses, getNews, getAllNews, updateNews } = require("../../service/newsService/newsService")

var newsController = {
    getMoodleData: async (req,res)=>{
        try{
            var rta = await getMoodleCourses()
            res.send(rta)
        }catch(err){
            res.send(500)
        }

    },
    create: async (req,res)=>{
        try{
            var rta = await createNew(req.body.new)
            res.sendStatus(200)
        }catch(err){
            res.sendStatus(500)
        }
    },
    getPlatformNews:async (req,res)=> {
       try{
        
        var rta = await getNews(req.body.user)
        res.send(rta)
       }catch(err){
        res.send(err)
       }
    },
    GetAllNews:async (req,res)=>{
        try{
            var rta = await getAllNews()
            res.send(rta)
        }catch(err){
            res.send(500)
        }
    },
    update: async (req,res)=>{
        await updateNews()
    }
}

module.exports = newsController