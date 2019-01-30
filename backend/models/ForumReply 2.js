const mongoose = require('mongoose');

const forumReplySchema = mongoose.Schema({
    reply: { type: String, required: true },
    date: { type: Date, required: true },
    replierName: { type: String, required: true },
    replierEmail: { type: String, required: true }
});

module.exports = mongoose.model('ForumReply', forumReplySchema); 