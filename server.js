if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const Handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const {
  allowInsecurePrototypeAccess
} = require('@handlebars/allow-prototype-access');
const morgan = require('morgan');
const routes = require('./routes');
const db = require('./models');
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');
const path = require('path');
const LocalStrategy = require('passport-local').Strategy;
const initializePassport = require('./passport-config');
const { use } = require('passport');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));
app.use(methodOverride('_method'));

// Handlebars
app.engine(
  'handlebars',
  exphbs({
    defaultLayout: 'main',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
  })
);

app.set('view engine', 'handlebars');
// app.set('view engine', 'ejs');
//app.engine('html', () => {});
//app.set('views', path.join(__dirname, 'public'));
//app.engine('html', require('ejs').renderFile);
//app.set('view engine', 'html');
//app.set('view engine', 'handlebars');
// app.set('view engine', 'ejs');

// app.get('/', (req, res) => {
//   res.render('index.handlebars', { name: 'namenamename' });
// });

app.get('/', checkAuthenticated, (req, res) => {
  res.render('index', { name: req.user.name });
});

app.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login');
});

passport.use(
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true,
      session: false
    },
    function (req, username, password, done) {
      console.log('username:', username);
      console.log('password:', password);
      console.log(req.body);
      db.User.findOne({
        where: { username: username, password: password }
      }).then(function (response) {
        // if (err) {
        //   console.log('error', err);
        //   return done(err);
        // }
        // if (!user) {
        //   console.log('username error', err);
        //   return done(null, false);
        // }
        // if (!user.verifyPassword(password)) {
        //   console.log('password error', err);
        //   return done(null, false);
        // }
        // return done(null, user);
        passport.serializeUser(function (user, done) {
          done(null, user);
        });

        passport.deserializeUser(function (user, done) {
          done(null, user);
        });
        return done(null, response);
      });
    }
  )
);

app.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }),
  (req, res) => {
    res.redirect('/');
  }
);

app.get('/epic', (req, res) => {
  res.render('epic.handlebars');
});

app.get('/register', checkNotAuthenticated, (req, res) => {
  res.render('register');
});
let users = [];
//app.post('/register', (req, res) => {});
app.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    // // users.push(
    //   id: Date.now().toString(),
    //   name: req.body.name,
    //   username: req.body.username,
    //   password: hashedPassword
    // });
    db.User.create(
      {
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
      },
      function (err, user) {
        if (err) err;

        res.redirect('/').status(201);
      }
    );

    res.redirect('/login');
  } catch (err) {
    console.log(err);
    res.redirect('/register');
  }
  console.log(users);
});

app.delete('/logout', (req, res) => {
  req.logOut();
  res.redirect('/login');
});

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/login');
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  next();
}

// Routes
app.use(routes);

const syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === 'test') {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(() => {
  app.listen(PORT, () => {
    console.log(
      '==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.',
      PORT,
      PORT
    );
  });
});

module.exports = app;
