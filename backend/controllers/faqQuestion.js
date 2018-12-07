const FaqQuestion = require('../models/FaqQuestion.js');

exports.getQuestions = (req, res, next) => {
    FaqQuestion.find({}, (err, questions) => {
        if (err) {
            return res.json({ message: 'An error ocurred. No FAQ questions could be fetched.', questions: null, errorCode: 1 });
        }
        return res.json({ message: 'FAQ questions fetched succesfully.', questions: questions, errorCode: 0 });
    })
} 