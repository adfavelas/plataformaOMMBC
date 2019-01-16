const jwt = require('jsonwebtoken');
const Buffer = require('buffer').Buffer;

const Problem = require('../models/Problem');
const Student = require("../models/Student");
const Answer = require('../models/Answer');

exports.getProblems = async (req, res) => {
    const query = {};
    if (req.query.area && req.query.area != 'null') {
        query.area = req.query.area;
    }
    if (req.query.topic && req.query.topic != 'null') {
        query.topic = req.query.topic;
    }
    if (req.query.level && req.query.level != 'null') {
        query.level = req.query.level;
    }

    try {
        const fetchedProblems = await Problem.find(query);
        return res.json({ message: "Success", problems: fetchedProblems, errorCode: 0 });
    } catch (err) {
        console.log(err);
        return res.json({ message: "Ha ocurrido un error, por favor intentalo mas tarde.", errorCode: 1 })
    }

}

exports.findProblemById = async (req, res) => {
    const id = req.params.problemId;
    try {
        const problem = await Problem.findById({ _id: id });
        return res.json({ message: "Success", problem: problem, errorCode: 0 });
    } catch (err) {
        console.log(err);
        return res.json({ message: "No se ha encontrado el problema", errorCode: 1 });
    }
}

// get token for Student id , make answer Object , transfer to bytes, save
exports.submitProblem = (req, res) => {
    Student.findOne({ email: req.user.email }, (err, student) => {
        console.log(student);
        if (err) {
            console.log(err);
            return res.json({ message: "No se ha encontrado al usuario.", errorCode: 1 });
        } else {
            const answer = new Answer({
                problemId: req.body.problemId,
                studentEmail: req.user.email,
                answer: Buffer.from(req.body.answer, 'utf8').toString('base64'),
                status: 'pending'
            });
            console.log('Bytes to string ' + Buffer.from(answer.answer, 'base64').toString('utf8'));
            answer.save().then(response => {
                console.log(response);
                return res.json({ message: "Success", errorCode: 0 });
            }).catch(errorResponse => {
                console.log(errorResponse);
                return res.json({ message: "Ha ocurrido un error, por favor intentalo mas tarde.", errorCode: 1 });
            })
        }
    });
}

exports.getPendingProblems = async (req, res) => {
    let problemsId = [];
    //Search answers from given student
    try {
        const answers = await Answer.find({ $and: [{ studentEmail: req.user.email }, { $or: [{ status: 'pending' }, { status: 'incorrect' }] }] });
        for (let i = 0; i < answers.length; i++) {
            if (!(problemsId.includes(answers[i].problemId))) {
                problemsId.push(answers[i].problemId);
            }
        }
        const problems = await Problem.find({ _id: problemsId });
        return res.json({ message: "Success", problems: problems, errorCode: 0 });

    } catch (err) {
        console.log(err);
        return res.json({ message: "No se encontraron respuestas.", errorCode: 1 });
    }
}

exports.getAnsweredProblems = async (req, res) => {
    let problemsId = [];
    try {
        const answers = await Answer.find({ $and: [{ studentEmail: req.user.email }, { status: 'correct' }] });
        for (let i = 0; i < answers.length; i++) {
            if (!(problemsId.includes(answers[i].problemId))) {
                problemsId.push(answers[i].problemId);
            }
        }
        const problems = await Problem.find({ _id: problemsId });
        return res.json({ message: "Success", problems: problems, errorCode: 0 });
    }
    catch (err) {
        console.log(err);
        return res.json({ message: "No se encontraron respuestas.", errorCode: 1 })
    }
}

exports.checkIfProblemAnswered = async (req, res) => {
    const problemId = req.params.problemId;
    try {
        const answer = await Answer.findOne({ studentEmail: req.user.email, problemId: problemId });
        answer.answer = Buffer.from(answer.answer, 'base64').toStringI('utf8');
        return res.json({ message: "success", errorCode: 0, answer });
    } catch (err) {
        console.log(err);
        return res.json({ message: "No se ha encontrado", errorCode: 1 })
    }
}