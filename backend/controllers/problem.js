const jwt       = require('jsonwebtoken');
const Buffer    = require('buffer').Buffer;

const Problem   = require('../models/Problem');
const Student   = require("../models/Student");
const Answer    = require('../models/Answer');

exports.getProblems = (req,res)=> {
    console.log(req.query);
    const query = {};
    if ( req.query.area) {
        query.area = req.query.area
    }
    if( req.query.topic) {
        query.topic = req.query.topic
    } 
    if ( req.query.level) {
        query.level = req.query.level;
    } 
    Problem.find(query, (err,fetchedProblems)=>{
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
                answer: Buffer.from(req.body.answer, 'utf8').toString('base64'),
                status: 'pending'
            });
            console.log('Bytes to string ' + Buffer.from(answer.answer, 'base64').toString('utf8'));
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