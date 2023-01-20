const { getTag, createTag, updateTag, deleteTag } = require("../../service/EventService/tagService")

var tagController = {
    get: async (req,res)=>{
        try{
            var rta = await getTag()
            res.send(rta)
        }catch(err){
            res.sendStatus(500)
        }
    },
    create: async (req,res)=>{
        try{
            var rta = await createTag(req.body.tag)
            res.sendStatus(200)
        }catch(err){
            res.sendStatus(500)
        }
    },
    update: async (req,res)=>{
        try{
            var rta = await updateTag(req.body.tag, req.body.tagid)
            res.sendStatus(200)
        }catch(err){
            res.sendStatus(500)
        }
    },
    delete: async (req,res)=>{
        try{
            var rta = await deleteTag( req.params.tagid)
            res.sendStatus(200)
        }catch(err){
            res.sendStatus(500)
        }
    },
}

module.exports = tagController