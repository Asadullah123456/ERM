const mongoose = require("mongoose");

const credentialAuditSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Credential" },
    previousValue: { type: mongoose.Schema.Types.Mixed },
    updatedValue: { type: mongoose.Schema.Types.Mixed },
    operation: { type: String },
  },
  { timestamps: true }
);

const CredentialAudit = mongoose.model(
  "CredentialAudit",
  credentialAuditSchema
);
module.exports = CredentialAudit;
