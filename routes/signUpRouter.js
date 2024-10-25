const { Router } = require('express');
const addUser = require('../controllers/addUser');

const signUpRouter = Router();

signUpRouter.get("/", (req, res) => {
    res.render("sign-up")
})

signUpRouter.post("/", async (req, res, next) => {
    addUser(req, res, next)
});

module.exports = signUpRouter;