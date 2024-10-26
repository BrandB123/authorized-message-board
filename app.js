const express =  require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const indexRouter = require('./routes/indexRouter');
const signUpRouter = require('./routes/signUpRouter');
const membersRouter = require('./routes/membersRouter')

const PORT = process.env.PORT || 3000;

const pool = require('./db/pool');

const app = express();

app.use(session({ secret: "unsecureExample", resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
        const user = rows[0];
  
        if (!user) {
          return done(null, false, { message: "Incorrect username" });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          return done(null, false, { message: "Incorrect password" })
        }

        return done(null, user);
      } catch(err) {
          return done(err);
      }
    })
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});
  
passport.deserializeUser(async (id, done) => {
    try {
      const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
      const user = rows[0];
  
      done(null, user);
    } catch(err) {
      done(err);
    }
});

app.use(function (req, res, next) {
    res.locals.user = req.user
    next()
})

app.set("view engine", "ejs")

app.use("/", indexRouter);
app.use("/sign-up", signUpRouter);
app.use("/members", membersRouter);

app.get('/test', (req, res) => {
  res.send('Server is working');
});


app.listen(PORT, '0.0.0.0', () => console.log(`Listening for authorized users on port ${PORT}`))