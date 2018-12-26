const express = require('express');
const checkToken = require('../middleware/checkToken.js');
const forumFunctions = require('../controllers/forumFunctions');
const router = express.Router();


router.get('', checkToken, (req,res,next)=> {
    forumFunctions.getForumQuestions(req,res);
});

router.post('/createForumQuestion', checkToken, (req,res,next)=>{
    forumFunctions.createForumQuestion(req,res);
});

router.put('/createReply', checkToken, (req,res,next)=> {
    // questionId, pregunta , emailUser
    forumFunctions.createReply(req,res);
});

router.delete('/deleteReply/:replyId', checkToken, (req, res, next) => {
    const replyId = req.params.replyId;
    forumFunctions.deleteReply(replyId, res, next);
});

module.exports = router;