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