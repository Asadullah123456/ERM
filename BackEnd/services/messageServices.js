const MessageLog = require('../models/messageLogModel');
const MessageAudit = require('../models/messageAuditModel');
async function logAuditEvent(userId, previousValue, updatedValue, operation) {
  try {
    await MessageAudit.create({
      userID: userId,
      previousValue: previousValue,
      updatedValue: updatedValue,
      operation: operation,
    });
  } catch (err) {
    await MessageLog.create({
      userID: userId,
      errorMessage: `Error creating: ${err.message}`,
      operation: operation,
    });
  }
}

module.exports = {
  logAuditEvent,
};
