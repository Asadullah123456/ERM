const ContactLog = require('../models/contactLogModel');
const ContactAudit = require('../models/contactAuditModel');

async function logAuditEvent(userId, previousValue, updatedValue, operation) {
  try {
    await ContactAudit.create({
      userID: userId,
      previousValue: previousValue,
      updatedValue: updatedValue,
      operation: operation,
    });
  } catch (err) {
    await ContactLog.create({
      userID: userId,
      errorMessage: `Error creating: ${err.message}`,
      operation: operation,
    });
  }
}

module.exports = {
  logAuditEvent,
};
