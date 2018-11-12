const express           = require('express');
const checkToken        = require('../middleware/checkToken');
const problemFunctions  = require('../controllers/problem');
const router = express.Router();

router.get('', checkToken, (req,res,next)=> {
    problemFunctions.getProblems(req,res);
})


module.exports = router;
