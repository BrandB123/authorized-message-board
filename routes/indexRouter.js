const { Router } = require('express');
const passport = require('passport');
const getMessages = require('../controllers/getMessages')
const deleteMessage = require('../controllers/deleteMessage')

const indexRouter = Router()

indexRouter.get("/", async (req, res) => {
    const messages = await getMessages();
    res.render("index", { user: req.user, messages: messages });
})

indexRouter.post("/", async (req, res) => {
    await deleteMessage(req.body.messageId);
    res.redirect("/");
})

indexRouter.post(
    "/sign-in", 
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/"
    })
);

indexRouter.get("/sign-out", (req, res, next) => {
    req.logout((err) => {
        if (err){
            return next(err);
        }
        res.redirect("/");
    });
});

module.exports = indexRouter