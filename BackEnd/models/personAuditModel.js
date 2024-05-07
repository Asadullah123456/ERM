const mongoose = require("mongoose");

const personAuditSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Person" },
    previousValue: { type: mongoose.Schema.Types.Mixed },
    updatedValue: { type: mongoose.Schema.Types.Mixed },
    operation: { type: String },
  },
  { timestamps: true }
);

const PersonAudit = mongoose.model(
  "PersonAudit",
  personAuditSchema
);
module.exports = PersonAudit;
