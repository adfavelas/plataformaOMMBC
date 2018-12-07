const mongoose = require('mongoose');

const faqQuestionSchema = mongoose.Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true }
});

module.exports = mongoose.model('FaqQuestion', faqQuestionSchema);