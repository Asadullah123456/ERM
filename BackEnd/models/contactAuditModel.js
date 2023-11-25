const mongoose = require("mongoose");

const contactAuditSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Contact" },
    previousValue: { type: mongoose.Schema.Types.Mixed },
    updatedValue: { type: mongoose.Schema.Types.Mixed },
    operation: { type: String },
  },
  { timestamps: true }
);

const ContactAudit = mongoose.model(
  "ContactAudit",
  contactAuditSchema
);
module.exports = ContactAudit;
