// Problema {
// 	idProblema:"";
// 	area:"";
// 	tema:"";
// 	nivel:"";
// 	problema:"";
// 	imagen:"";
// 	solucion:"";
// 	tip:"";
// 	origen:"";
// 	numeroProblema:"";
// }

const mongoose = require("mongoose");

const problemSchema = mongoose.Schema({
    area: {type: String, required: true},
    topic: {type: String, required: true},
    level: {type: Number, required: true},
    title: {type: String, required: true},
    problemDescription: {type: String, required: true},
    image: {type: String},
    solution : {type: String},
    tip: {type: String},
    origin: {type: String, required: true},
    problemNumber: {type: Number, required: true}
});

module.exports = mongoose.model("Problem", problemSchema);