const jwt       = require('jsonwebtoken');

const Problem   = require('../models/Problem');
const Student   = require("../models/Student");
const Answer    = require('../models/Answer');

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
    });
}
// get token for Student id , make answer Object , transfer to bytes, save
exports.submitProblem = (req,res)=> {
    Student.findOne({email: req.body.email}, (err, student)=> {
        console.log(student);
        if(err) {
            console.log(err);
            return res.json({message: "No se ha podido encontrar su usuaio ",errorCode: 1});
        } else {
            const answer = new Answer({
                problemId: req.body.problemId,
                studentId: student._id,
                answer: req.body.answer,
                status: 'pending'
            });
            answer.save().then(response => {
                console.log(response);
                return res.json({message: "Success", errorCode: 0});
            }).catch( errorResponse => {
                console.log(errorResponse);
                return res.json({message: "Ha ocurrido un error ",errorCode: 1});
            })
        }
    });
}