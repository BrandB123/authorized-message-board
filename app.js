const express =  require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require("bcryptjs");

const pool = require('./db/pool');


const app = express();
app.set("view engine", "ejs")

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
          // passwords do not match!
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

app.get("/", async (req, res, next) => {
    bcrypt.hash('passwordTest', 10, async (err, hashedPassword) => {
        if (err) {
            return next(err);
        }
        try {
            await pool.query(`INSERT INTO users (name, username, password, member, admin)
                VALUES ('brandontest bartlettTest', 'test2@test.com', $1, true, true)`, [hashedPassword])
            res.send("Added a user to the database. Go check it out")
        } catch(err){
            return next(err)
        }
    });
})


app.listen(3000, () => console.log("Listening for authorized users on port 3000"))