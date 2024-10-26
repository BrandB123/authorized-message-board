const db = require('../db/queries');

async function deleteMessage(messageId){
    try {
        await db.deleteMessage(messageId);
    } catch(err){
        console.error(err)
    }
}

module.exports = deleteMessage;