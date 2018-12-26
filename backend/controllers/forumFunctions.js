const ForumQuestion = require('../models/ForumQuestion');
const ForumReply = require('../models/ForumReply');
const Student  = require('../models/Student');
const mongoose = require('mongoose');

exports.getForumQuestions = (req,res)=> {
    ForumQuestion.find().populate('replies').exec((err, forumQuestions) => {
        if (err) {
            console.log(err);
            return res.json({message: 'Ha ocurrido un error', errorCode: 1});
        }
        return res.json({message: 'success', errorCode: 0, forumQuestions});
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
        if (err) {
            return res.json({message: "Ha ocurrido un error intenta mas tarde", errorCode: 1});
        }
        else {
            Student.findOne({email: req.user.email}, (errStudent, fetchStudent) => {
                if (errStudent) {
                    return res.json({message: "Ha ocurrido un error intenta mas tarde ", errorCode: 1});
                } 

                const reply = new ForumReply({
                    reply : req.body.reply,
                    date: Date.now(),
                    replierName: `${fetchStudent.name} ${fetchStudent.lastName}`,
                    replierEmail: req.user.email
                });
                
                reply.save((err) => {
                    if (err) {
                        console.log(err);
                        return res.json({message: "Ha ocurrido un error, intenta mas tarde", errorCode: 1});
                    }
                    fetchForumQuestion.replies.push(reply._id);
                    fetchForumQuestion.save((err) => {
                        if (err) {
                            console.log(err);
                            return res.json({message: "Ha ocurrido un error, intenta mas tarde", errorCode: 1});
                        }
                        return res.json({message: "La respuesta se ha agregado exitosamente", reply: reply, errorCode: 0});
                    });
                });
            });
        }
    });
}

exports.deleteReply = (replyId, res, next) => {
    ForumReply.findOneAndDelete({_id: replyId}, (err) => {
        if (err) {
            console.log(err);
            return res.json({ message: "La respuesta no se pudo eliminar", errorCode: 1 });
        }
        ForumQuestion.findOne({ 'replies': replyId }, (err, question) => {
            const replyIndex = question.replies.indexOf(replyId);
            
            if (replyIndex > -1) {
                question.replies.splice(replyIndex, 1);
                question.save((err) => {
                    if (err) {
                        console.log(err);
                        return res.json({ message: "La respuesta no se pudo eliminar", errorCode: 1 });
                    }
                    return res.json({ message: "La respuesta se eliminó exitosamente", errorCode: 0 });
                });
            }
        });
    });
}