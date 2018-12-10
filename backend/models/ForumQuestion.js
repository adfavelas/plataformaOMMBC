const mongoose = require('mongoose');

const forumQuestionSchema = mongoose.Schema({
    title: { type: String, requirede: true },
    question: { type: String, required: true },
    date: { type: Date, required: true },
    questionerId: { type: String, required: true },
    replies: [
        {
            reply: { type: String, required: true },
            date: { type: Date, required: true },
            replierId  : { type: String, required: true }
        }
    ]
});

module.exports = mongoose.model('ForumQuestion', forumQuestionSchema);