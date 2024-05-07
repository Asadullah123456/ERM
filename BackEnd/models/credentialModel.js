const mongoose = require("mongoose");
const { logAuditEvent } = require("../services/credentialServices");

const credentialSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    password: { type: String },
    role: { type: String },
    isOnline: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

credentialSchema.post("findByIdAndUpdate", async function (result) {
  const doc = await this.model.findOne(this.getQuery());
  await logAuditEvent(doc._id, doc, result, "findByIdAndUpdate");
});

credentialSchema.pre("save", async function (next) {
  const isNew = this.isNew;
  const operation = isNew ? "insert" : "update";
  const previousValue = isNew ? null : this.toObject();
  await logAuditEvent(this._id, previousValue, this, operation);
  next();
});

const Credential = mongoose.model("Credential", credentialSchema);
module.exports = Credential;
