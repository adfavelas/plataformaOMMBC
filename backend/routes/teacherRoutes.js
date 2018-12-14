const express = require('express');
const checkToken = require('../middleware/checkToken.js');
const teacherFunctions = require('../controllers/teacher');
const router = express.Router();

router.get('/getPendingTeachers', checkToken, (req, res, next) => {
    teacherFunctions.getPendingTeachers(req, res, next);
});

router.post('/createTeacher', (req,res,next)=> {
    teacherFunctions.registerTeacher(req,res);
});
module.exports = router;