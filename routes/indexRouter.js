const { Router } = require('express');
const passport = require('passport');
const getMessages = require('../controllers/getMessages')

const indexRouter = Router()

indexRouter.get("/", async (req, res) => {
    const messages = await getMessages();
    res.render("index", { user: req.user, messages: messages });
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