const db = require('../db/queries');

async function getMessages(){
  const messages = db.getMessages();
  return messages;
}

module.exports = getMessages;