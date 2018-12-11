const express = require('express');
const checkToken = require('../middleware/checkToken.js');
const faqQuestionFunctions = require('../controllers/faqQuestion.js');
const router = express.Router();

router.get('', checkToken, (req, res, next) => {
    faqQuestionFunctions.getQuestions(req, res);
});

router.get('/forum', checkToken , (req,res,next)=> {
    faqQuestionFunctions.getForumQuestions(req,res);
});

module.exports = router;