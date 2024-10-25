const { Router } = require('express');

const indexRouter = Router()

indexRouter.get("/", (req, res) => {
    res.send("sign in and home page coming soon");
})

module.exports = indexRouter