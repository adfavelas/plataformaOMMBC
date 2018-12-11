const FaqQuestion = require('../models/FaqQuestion.js');
const ForumQuestions = require('../models/ForumQuestion');

exports.getQuestions = (req, res, next) => {
    FaqQuestion.find({}, (err, questions) => {
        if (err) {
            return res.json({ message: 'An error ocurred. No FAQ questions could be fetched.', questions: null, errorCode: 1 });
        }
        return res.json({ message: 'FAQ questions fetched succesfully.', questions: questions, errorCode: 0 });
    })
} 

exports.getForumQuestions = (req,res)=> {
    ForumQuestions.find({} , (err, forumQuestions)=> {
        if (err) {
            console.log(err);
            return res.json({message: 'Ha ocurrido un error', errorCode: 1});
        } else {
            return res.json({message: 'success', errorCode: 0, forumQuestions});
        }
    });
}