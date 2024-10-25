const db = require('../db/queries');
const bcrypt = require('bcryptjs');

async function addUser(req, res, next){
    const name = `${req.body.firstName} ${req.body.lastName}`;
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        if (err) {
            return next(err);
        }
        try {
            db.addUser(name, req.body.email, hashedPassword)
            res.redirect("/")
        } catch(err){
            return next(err)
        }
    });
}

module.exports = addUser