const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {type: String, require: true}, //Admin | Student | Teacher
  status: {type: String, require: true} // Active | Diasabled | Deleted
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
