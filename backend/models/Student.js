const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const studentSchema = mongoose.Schema({
    name: { type: String, required: true },
    firstLastName: { type: String, required: true },
    secondLastName: { type: String, required: false },
    // age: { type: Number, required: true },
    schoolName: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    birthDate: { type: String, required: true },
    solvedProblems: [
        { idAnswer: mongoose.Schema.Types.ObjectId ,idProblem: mongoose.Schema.Types.ObjectId, status: String, score: Number }
    ],
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    totalScore: {type: Number}
});

studentSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Student", studentSchema);
