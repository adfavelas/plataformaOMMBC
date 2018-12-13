const ForumQuestion = require('../models/ForumQuestion');

exports.getForumQuestions = (req,res)=> {
    ForumQuestion.find({} , (err, forumQuestions)=> {
        if (err) {
            console.log(err);
            return res.json({message: 'Ha ocurrido un error', errorCode: 1});
        } else {
            return res.json({message: 'success', errorCode: 0, forumQuestions});
        }
    });
}

exports.createForumQuestion = (req,res)=> {
    const date = Date.now();

    const forumQuestion = new ForumQuestion({
        title : req.body.title,
        question: req.body.question,
        date: date,
        questionerId: req.user.email,
        replies: []
    });

    forumQuestion.save().then( result => {
        console.log(result);
        return res.json({message: "success", errorCode: 0 , result});
    }).catch( err => {
        console.log(err);
        return res.json({errorCode: 1, message: "failed"});
    });
}