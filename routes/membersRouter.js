require('dotenv').config()
const { Router } = require('express');
const db = require('../db/queries')

const membersRouter = Router();

membersRouter.get("/join-the-club", (req, res) => {
    res.render("join-the-club")
})

membersRouter.post("/join-the-club", async (req, res, next) => {
    if (req.body.secretPassword === process.env.MEMBERS_PASSWORD){
        await db.addMember(req.body.username);
        console.log(`Member status added`);
        res.redirect("/")
    } else {
        res.redirect("/members/join-the-club")
    }
});

module.exports = membersRouter