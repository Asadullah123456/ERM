const mongoose = require('mongoose');
const { logAuditEvent } = require("../services/messageServices");


const messageSchema = new mongoose.Schema(
    {
        senderID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Credential",
            required: true,
        },
        receiverID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Credential",
            required: true,
        },
        message: { type: String, required: true },
        active: { type: Boolean , default: true}
    }, { timestamps: true });


messageSchema.post("findByIdAndUpdate", async function (result) {
  const doc = await this.model.findOne(this.getQuery());
  await logAuditEvent(doc._id, doc, result, "findByIdAndUpdate");
});

messageSchema.pre("save", async function (next) {
  const isNew = this.isNew;
  const operation = isNew ? "insert" : "update";
  const previousValue = isNew ? null : this.toObject();
  await logAuditEvent(this._id, previousValue, this, operation);
  next();
});


const Message = mongoose.model("Message", messageSchema);
module.exports = Message;