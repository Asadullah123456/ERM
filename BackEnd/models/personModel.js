const mongoose = require('mongoose');
const { logAuditEvent } = require("../services/personServices");


const personSchema = new mongoose.Schema(
    {
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Credential",
            required: true,
        },
        firstName: { type: String, required: true },
        lastName: { type: String },
        personCNIC: { type: String, required: true },
        phoneNumber: { type: String, required: true },
        address: { type: String, required: true },
        photo: { type: String, required: true },
        active: { type: Boolean , default: true}
    }, { timestamps: true });


personSchema.post("findByIdAndUpdate", async function (result) {
  const doc = await this.model.findOne(this.getQuery());
  await logAuditEvent(doc._id, doc, result, "findByIdAndUpdate");
});

personSchema.pre("save", async function (next) {
  const isNew = this.isNew;
  const operation = isNew ? "insert" : "update";
  const previousValue = isNew ? null : this.toObject();
  await logAuditEvent(this._id, previousValue, this, operation);
  next();
});


const Person = mongoose.model("Person", personSchema);
module.exports = Person;