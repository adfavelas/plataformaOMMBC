const Problem   = require('../models/Problem');


exports.getProblems = (req,res)=> {
    Problem.find({}, (err,fetchedProblems)=>{
        if (err) {
            console.log(err);
            return res.json({message: "ha ocurrido un error intentalo mas tarde", errorCode: 1})
        } else {
            return res.json({message: "Success", problems: fetchedProblems, errorCode: 1});
        }
    }); 
}

exports.findProblemById = (req,res)=>{
    const id = req.params.id;
    Problem.findById({_id: id}, (err, problem)=>{
        if( err ){
            console.log(err);
            return res.json({message: "No se ha encontrado el problema", errorCode: 1});
        } else {
            return res.json({message: "Success", problem: problem, errorCode: 0});
        }
    })
}