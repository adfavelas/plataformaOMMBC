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
    problemDescription: {type: String, required: true},
    image: {type: String},
    solution : {type: String, required: true},
    tip: {type: String, required: true},
    origin: {type: String, required: true},
    problemNumber: {type: String, required: true}
});

module.exports = mongoose.model("Problem", problemSchema);