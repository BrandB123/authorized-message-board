require('dotenv').config()
const { Router } = require('express');
const db = require('../db/queries')
const addMessage = require('../controllers/addMessage');

const membersRouter = Router();

membersRouter.get("/join-the-club", (req, res) => {
    res.render("join-the-club")
})

membersRouter.post("/join-the-club", async (req, res, next) => {
    try {
        if (req.body.secretPassword === process.env.MEMBERS_PASSWORD){
        await db.addMember(res.locals.user.username);
        console.log(`Member status added`);
        res.redirect("/")
        } else {
        res.redirect("/members/join-the-club")
        }
    } catch (err){
        console.error(err)
        res.redirect("/");
    }
});

membersRouter.get("/message", (req, res) => {
    console.log(res.locals.user)
    res.render("message");
})

membersRouter.post("/message", (req, res, next) => {
    addMessage(req, res, next);
    res.redirect("/");
})

module.exports = membersRouter