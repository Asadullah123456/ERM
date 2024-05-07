const CredentialLog = require('../models/credentialLogModel');
const CredentialAudit = require('../models/credentialAuditModel');

async function logAuditEvent(userId, previousValue, updatedValue, operation) {
  try {
    await CredentialAudit.create({
      userID: userId,
      previousValue: previousValue,
      updatedValue: updatedValue,
      operation: operation,
    });
  } catch (err) {
    await CredentialLog.create({
      userID: userId,
      errorMessage: `Error creating: ${err.message}`,
      operation: operation,
    });
  }
}

module.exports = {
  logAuditEvent,
};
