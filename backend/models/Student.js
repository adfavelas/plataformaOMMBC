const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const studentSchema = mongoose.Schema({
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Number },
    schoolName: { type: String, required: true },
    state: { type: String},
    country: { type: String, required: true },
    birthDate: { type: String, required: true },
    solvedProblems: [
        { idAnswer: mongoose.Schema.Types.ObjectId ,idProblem: mongoose.Schema.Types.ObjectId, status: String, score: Number }
    ],
    email: { type: String, required: true, unique: true },
    totalScore: {type: Number}
});

studentSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Student", studentSchema);
