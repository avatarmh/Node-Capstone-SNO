'use strict';
const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const config = require('../config');
const router = express.Router();
const records = require('./records')
const { NewsItem } = require('../news/models');

const createAuthToken = function (user) {
  return jwt.sign({ user }, config.JWT_SECRET, {
    subject: user.username,
    expiresIn: config.JWT_EXPIRY,
    algorithm: 'HS256'
  });
};

const localAuth = passport.authenticate('local', { session: false });
// The user provides a username and password to login
router.post('/login', localAuth, (req, res, next) => {
  
  // now create two new records
  console.log('user', req.user)
  const authToken = createAuthToken(req.user.serialize());
  if (req.user.username !== 'demo@thinkful.com') {
    return res.json({ authToken, userID: req.user._id });
  }

  NewsItem.deleteMany({ ownerID: req.user._id })
  .then(() => {
    NewsItem.insertMany(records).then(docs => {
      res.json({ authToken, userID: req.user._id });
    }).catch(next)
  }).catch(next)

});

const jwtAuth = passport.authenticate('jwt', { session: false });

// The user exchanges a valid JWT for a new one with a later expiration
router.post('/refresh', jwtAuth, (req, res) => {
  const authToken = createAuthToken(req.user);
  res.json({ authToken });
});

module.exports = { router };
