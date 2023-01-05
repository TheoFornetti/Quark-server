async function careerPath(completUser){
    completUser.listaCurso.forEach(course =>{
        console.log(course.idCurso)
    })

    return completUser
}