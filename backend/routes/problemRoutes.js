const express           = require('express');
const checkToken        = require('../middleware/checkToken');
const problemFunctions  = require('../controllers/problem');
const router = express.Router();

router.get('', checkToken, (req,res,next)=> {
    problemFunctions.getProblems(req,res);
})

router.get('/:problemId', checkToken, (req,res,next)=>{
    problemFunctions.findProblemById(req,res);
});

router.post('/submitProblem', checkToken, (req,res,next)=> {
    problemFunctions.submitProblem(req,res);
});

router.get('/pendingProblems/:studentId', checkToken, (req, res, next) => {
    problemFunctions.getPendingProblems(req,res);
});

router.get('/answeredProblems/:studentId', checkToken, (req,res,next)=>{

});

module.exports = router;
