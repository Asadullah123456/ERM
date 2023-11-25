const mongoose = require("mongoose");

const personLogSchema = new mongoose.Schema(
  {
    userID: { type: mongoose.Schema.Types.ObjectId, ref: "Person" },
    errorMessage: { type: String },
    operation: { type: String },
  },
  { timestamps: true }
);

const PersonLogs = mongoose.model("PersonLogs", personLogSchema);
module.exports = PersonLogs;
