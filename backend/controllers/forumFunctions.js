const ForumQuestions = require('../models/ForumQuestion');

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