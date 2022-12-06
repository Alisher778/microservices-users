var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var usersSchema = new Schema({
  name: { type: String, required: true, index: true },
  dateOfBirth: Date,
  country: String,
  language: { type: String, default: "en", enum: ["en", "de"], index: true },
  phone: String,
}, {
  timestamps: true
});

// Add a pre-save hook to update the updatedAt timestamp
usersSchema.pre('save', function (next) {
  if (!this.isNew) {
    this.updatedAt = new Date();
  }
  next();
});

const Users = mongoose.model("Users", usersSchema);


module.exports = Users;
