const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const config = require('./config');
const app = express();
let googleProfile = {};

passport.serializeUser((user, done) => done(null, user));

passport.deserializeUser((obj, done) => done(null, obj));

passport.use(
  new GoogleStrategy(
    {
      clientID: config.GOOGLE_CLIENT_ID,
      clientSecret: config.GOOGLE_CLIENT_SECRET,
      callbackURL: config.CALLBACK_URL
    },
    function(accessToken, refreshToken, profile, callback) {
      googleProfile = {
        id: profile.id,
        displayName: profile.displayName
      };
      callback(null, profile);
    }
  )
);

app.set('view engine', 'pug');
app.set('views', './views');
app.use(passport.initialize());
app.use(passport.session());

//app routes
app.get('/', (req, res) => res.render('index', { user: req.user }));

app.get('/logged', (req, res) => res.render('logged', { user: googleProfile }));

//Passport routes
app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);
app.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/logged',
    failureRedirect: '/'
  })
);

app.listen(3000);

app.use((req, res, next) => res.status(404).send('404! Page not found!'));
