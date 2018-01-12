const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const config = require('./config');
const app = express();
const googleProfile = {};

// app.set('view engine', 'pug');
// app.set('views', './views');

// app.get('/', (req, res) => res.render('main'));

// app.get('/auth/google', (req, res) => res.render('auth'));

// app.get('/auth/google/user', (req, res) => {
//   res.render('verify', {
//     user: {
//       email: req.query.email,
//       password: req.query.password
//     }
//   });
// });

// app.listen(3000);

// app.use((req, res, next) => res.status(404).send('404! Page not found!'));
