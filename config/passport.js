var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var db = require('../models');

// Telling passport we want to use a Local Strategy. In other words, we want login with a username/email and password
passport.use(
  new LocalStrategy(function (username, password, done) {
    // When a user tries to sign in this code runs
    db.User.findOne({
      where: {
        username
      }
    }).then(function (dbUser) {
      if (dbUser && dbUser.validPassword(password)) {
        return done(null, dbUser);
      }
      return done(null, false, {
        message: 'Incorrect Username and/or Password.'
      });
    });
  })
);

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

// Exporting our configured passport
module.exports = passport;
