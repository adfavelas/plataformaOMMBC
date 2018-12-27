const express = require('express');
const checkToken = require('../middleware/checkToken.js');
const teacherFunctions = require('../controllers/teacher');
const router = express.Router();

router.get('/getPendingTeachers', checkToken, (req, res, next) => {
    teacherFunctions.getPendingTeachers(req, res, next);
});

router.post('/createTeacher', checkToken, (req,res,next)=> {
    teacherFunctions.registerTeacher(req,res);
});

router.put('/acceptTeacher', checkToken, (req, res, next) => {
    teacherFunctions.acceptTeacher(req, res, next);
});

router.put('/denyTeacher', checkToken, (req, res, next) => {
    teacherFunctions.denyTeacher(req, res, next);
});

module.exports = router;