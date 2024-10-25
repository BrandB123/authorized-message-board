const { Router } = require('express');
const passport = require('passport');

const indexRouter = Router()

indexRouter.get("/", (req, res) => {
    // get messages data
    res.render("index", { user: req.user });
})

indexRouter.post("/", (req, res, next) => {
    // this is to be used for adding messages to the db
    res.end();
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