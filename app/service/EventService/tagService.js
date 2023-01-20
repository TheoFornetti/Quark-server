const {tag} = require("../../models/index")

async function getTag(){
    var rta = await tag.findAll()
    return rta
}

async function createTag(tagObject){
    console.log(tag)
    await tag.create({
        name:tagObject.name
    })
}

async function updateTag(tagObject, id){
    await tag.update({
        name:tagObject.name
    }, {where:{id}})
}

async function deleteTag(id){
    await tag.destroy({where:{id}})
}

module.exports = {deleteTag, updateTag, createTag, getTag}