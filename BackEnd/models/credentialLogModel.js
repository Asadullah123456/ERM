const mongoose = require("mongoose");

const credentialLogSchema = new mongoose.Schema(
  {
    userID: { type: mongoose.Schema.Types.ObjectId, ref: "Credential" },
    errorMessage: { type: String },
    operation: { type: String },
  },
  { timestamps: true }
);

const CredentialLogs = mongoose.model("CredentialsLog", credentialLogSchema);
module.exports = CredentialLogs;
