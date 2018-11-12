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

router.post('/submitProbblem', checkToken, (req,res,next)=> {
    problemFunctions.submitProblem(req,res);
});

module.exports = router;
