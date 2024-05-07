const PersonLog = require('../models/personLogModel');
const PersonAudit = require('../models/personAuditModel');

async function logAuditEvent(userId, previousValue, updatedValue, operation) {
  try {
    await PersonAudit.create({
      userID: userId,
      previousValue: previousValue,
      updatedValue: updatedValue,
      operation: operation,
    });
  } catch (err) {
    await PersonLog.create({
      userID: userId,
      errorMessage: `Error creating: ${err.message}`,
      operation: operation,
    });
  }
}

module.exports = {
  logAuditEvent,
};
