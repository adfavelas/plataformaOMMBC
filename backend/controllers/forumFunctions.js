const ForumQuestion = require('../models/ForumQuestion');
const ForumReply = require('../models/ForumReply');
const Student  = require('../models/Student');
// const mongoose = require('mongoose');

exports.getForumQuestions = async  (req,res)=> {
    try {
        const forumQuestions = await ForumQuestion.find().populate('replies').exec();
        return res.json({message: 'success', errorCode: 0, forumQuestions});
    } catch (err) {
        console.log(err);
        return res.json({message: 'Ha ocurrido un error', errorCode: 1});
    }
}

exports.createForumQuestion = async (req,res)=> {
    try {
        const date = Date.now();
        const forumQuestion = new ForumQuestion({
            title : req.body.title,
            question: req.body.question,
            date: date,
            questionerEmail: req.user.email,
            replies: []
        });
        await forumQuestion.save();
        return res.json({message: "success", errorCode: 0 });
    } catch (err) {
        console.log(err);
        return res.json({errorCode: 1, message: "Ha ocurrido un error intenta mas tarde"});
    }

}

exports.createReply =  async(req,res) => {
    try {
        const forumQuestion = await ForumQuestion.findById(req.body.questionId);
        const fetchStudent = await Student.findOne({email: req.user.email});
        const reply = new ForumReply({
            reply : req.body.reply,
            date: Date.now(),
            replierName: `${fetchStudent.name} ${fetchStudent.lastName}`,
            replierEmail: req.user.email
        });
        const savedReply = await reply.save();
        forumQuestion.replies.push(savedReply._id);
        await forumQuestion.save();
        return res.json({message: "La respuesta se ha agregado exitosamente", reply: reply, errorCode: 0});
    } catch(err) {
        console.log(err);
        return res.json({message: "Ha ocurrido un error intenta mas tarde", errorCode: 1});
    }
}

exports.deleteReply = async (replyId, res, next) => {
    try {
        await ForumReply.findOneAndDelete({_id: replyId});
        const question = await ForumQuestion.findOne({'replies': replyId});
        const replyIndex = question.replies.indexOf(replyId);
        if (replyIndex > -1) {
            question.replies.splice(replyIndex, 1);
            await question.save();
            return res.json({ message: "La respuesta se eliminó exitosamente", errorCode: 0 });
        } else  {
            return res.json({ message: "La respuesta no se pudo eliminar", errorCode: 1 });
        }
    } catch (err){
        console.log(err);
        return res.json({ message: "La respuesta no se pudo eliminar", errorCode: 1 });
    }
}