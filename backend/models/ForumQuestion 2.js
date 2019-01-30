const mongoose = require('mongoose');

const forumQuestionSchema = mongoose.Schema({
    title: { type: String, required: true },
    question: { type: String, required: true },
    date: { type: Date, required: true },
    questionerEmail: { type: String, required: true },
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ForumReply' }]
});

module.exports = mongoose.model('ForumQuestion', forumQuestionSchema);