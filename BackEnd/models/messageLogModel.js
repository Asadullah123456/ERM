const mongoose = require("mongoose");

const messageLogSchema = new mongoose.Schema(
  {
    userID: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
    errorMessage: { type: String },
    operation: { type: String },
  },
  { timestamps: true }
);

const MessagesLogs = mongoose.model("MessagesLog", messageLogSchema);
module.exports = MessagesLogs;
