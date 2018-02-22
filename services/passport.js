const passport = require('passport');
const GoogleStratery = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');


passport.use(new GoogleStratery({
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: '/auth/google/callback'
}, 
  (accessToken, refreshToken, profile, done) => {
    new User({ googleId: profile.id }).save();
}));
