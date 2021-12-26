require('dotenv').config();

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../models');

passport.use(
  new LocalStrategy(async (username, password, done) => {
    const user1 = await User.findUser({ username, password });

    if (user1) {
      return done(null, user1[0][0].id);
    } else {
      return done(null, false);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
