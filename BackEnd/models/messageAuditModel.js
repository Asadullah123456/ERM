const mongoose = require("mongoose");

const messageAuditSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
    previousValue: { type: mongoose.Schema.Types.Mixed },
    updatedValue: { type: mongoose.Schema.Types.Mixed },
    operation: { type: String },
  },
  { timestamps: true }
);

const MessageAudit = mongoose.model(
  "MessageAudit",
  messageAuditSchema
);
module.exports = MessageAudit;
