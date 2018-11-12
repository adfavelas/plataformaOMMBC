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
    tema: {type: String, required: true},
    tema: {type: String, required: true},
    problem: {type: String, required: true},
    image: {type: String},
    solution : {type: String, required: true},
    tip: {type: String, required: true},
    origin: {type: String, required: true},
    number : {type: String, required: true}
});

module.exports = mongoose.model("Problem", problemSchema);