const db = require('../db/queries');

async function addMessage(req, res, next){
    try{
      const date = new Date();
      const author = res.locals.user.username
      await db.addMessage(req.body.title, date, req.body.message, author);
    } catch (err){
	    return next(err)
    }
    next()
}

module.exports = addMessage;