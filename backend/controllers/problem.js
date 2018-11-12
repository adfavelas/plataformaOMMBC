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
    // console.log('---> ' + req.params.id);
    const id = req.params.problemId;
    Problem.findById({_id: id}, (err, problem)=>{
        if( err ){
            console.log(err);
            return res.json({message: "No se ha encontrado el problema", errorCode: 1});
        } else {
            return res.json({message: "Success", problem: problem, errorCode: 0});
        }
    })
}