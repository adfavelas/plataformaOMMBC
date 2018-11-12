const mongoose = require("mongoose");

const answerSchema = mongoose.Schema({
    problemId: {type: String, required: true},
    studentId: {type: String, required: true},
    answer: {type: String, required: true},
    status: {type: String, required: true} //pending | correct | incorrect
});

module.exports = mongoose.model("Answer", answerSchema);