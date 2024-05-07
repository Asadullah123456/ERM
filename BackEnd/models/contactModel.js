const mongoose = require('mongoose');
const { logAuditEvent } = require('../services/contactServices');

const contactSchema = new mongoose.Schema({
    contactOf: { type: mongoose.Schema.Types.ObjectId,
    ref: "Credential",
    required: true },
    contactIs: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Credential",
        required: true
    },
    contactName: { type: String },
    contactEmail: { type: String },
    phoneNumber: { type: String },
    tag: { type: String },
    photo: { type: String },
    address: { type: String },
    active: { type: Boolean, default: true }
},
{timestamps: true});

contactSchema.post("findByIdAndUpdate", async function (result) {
    const doc = await this.model.findOne(this.getQuery());
    await logAuditEvent(doc._id, doc, result, "findByIdAndUpdate");
});
  
contactSchema.pre("save", async function (next) {
    const isNew = this.isNew;
    const operation = isNew ? "insert" : "update";
    const previousValue = isNew ? null : this.toObject();
    await logAuditEvent(this._id, previousValue, this, operation);
    next();
});


const Contact = mongoose.model("Contact", contactSchema);
module.exports = Contact;