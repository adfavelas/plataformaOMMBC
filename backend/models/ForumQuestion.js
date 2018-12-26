const mongoose = require('mongoose');

const forumQuestionSchema = mongoose.Schema({
    title: { type: String, required: true },
    question: { type: String, required: true },
    date: { type: Date, required: true },
    questionerEmail: { type: String, required: true },
    replies: [ { type: mongoose.Schema.ObjectId, ref: "ForumReply" }]
    // replies: [
    //     {
    //         reply: { type: String, required: true },
    //         date: { type: Date, required: true },
    //         replierName  : { type: String, required: true },
    //         replierEmail  : { type: String, required: true }
    //     }
    // ]
});


module.exports = mongoose.model('ForumQuestion', forumQuestionSchema);