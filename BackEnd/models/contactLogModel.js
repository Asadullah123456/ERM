const mongoose = require("mongoose");

const contactLogSchema = new mongoose.Schema(
  {
    userID: { type: mongoose.Schema.Types.ObjectId, ref: "Contact" },
    errorMessage: { type: String },
    operation: { type: String },
  },
  { timestamps: true }
);

const ContactLogs = mongoose.model("ContactLog", contactLogSchema);
module.exports = ContactLogs;
