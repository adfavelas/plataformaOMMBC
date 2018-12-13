const ForumQuestion = require('../models/ForumQuestion');
const Student  = require('../models/Student');

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
        questionerEmail: req.user.email,
        replies: []
    });

    forumQuestion.save().then( result => {
        console.log(result);
        return res.json({message: "success", errorCode: 0 });
    }).catch( err => {
        console.log(err);
        return res.json({errorCode: 1, message: "Ha ocurrido un error intenta mas tarde"});
    });
}

exports.createReply = (req,res) => {
    ForumQuestion.findById(req.body.questionId, (err, fetchForumQuestion)=> {
        if ( err ) {
            return res.json({message: "Ha ocurrido un error intenta mas tarde", errorCode: 1});
        }
        else {
            Student.findOne({email: req.user.email}, (errStudent, fetchStudent) => {
                if ( err ) {
                    return res.json({message: "Ha ocurrido un error intenta mas tarde ", errorCode: 1});
                } 

                const reply = {
                    reply : req.body.reply,
                    date: Date.now(),
                    replierName: `${fetchStudent.name} ${fetchStudent.lastName}`,
                    replierEmail: req.user.email
                }

                fetchForumQuestion.replies.push(reply);

                ForumQuestion.findByIdAndUpdate(fetchForumQuestion._id, fetchForumQuestion, (errForum, resultForum)=>{
                    if ( errForum ) {
                        return res.json({message: "Ha ocurrido un error intenta mas tarde ", errorCode: 1});
                    } 
                    else {
                        return res.json({message: "La respuesta se ha agregado exitosamente", errorCode: 0});
                    }
                });
            });
        }
    });
}