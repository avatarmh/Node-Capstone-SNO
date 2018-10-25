'use strict';
const express = require('express');
//const bodyParser = require('body-parser');
const { NewsItem } = require('./models');
const router = express.Router();
//const jsonParser = bodyParser.json();

// GET requests to /posts => return 5 blogposts
router.get('/', (req, res) => {
  NewsItem
    .find()
    // we're limiting because blogPosts db just in case 
    // it grows to many documents
    .limit(5)
    // success callback: for each blogPost we got back, we'll
    // call the `.serialize` instance method we've created in
    // models.js in order to only expose the data we want the API return.
    .then(newsitems => {
      res.json({
        newsitems: newsitems.map(
          (newsitems) => newsitems.serialize())
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

// can also request by ID
router.get('/:id', (req, res) => {
   NewsItem
    // this is a convenience method Mongoose provides for searching
    // by the object _id property
    .findById(req.params.id)
    .sort({'date':1})
    .then(newsitems => res.json(newsitems.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});


router.post('/', (req, res) => {

  console.log(req.body);

  const requiredFields = ['title', 'date', 'source', 'summary'];
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send({ message, status: 'fail' });
    }
  }
  console.log(req.user)
  NewsItem
    .create({
      title: req.body.title,
      date: req.body.date,
      source: req.body.source,
      summary: req.body.summary,
      ownerID: req.user.userID
    })
    .then(newsitems => res.status(201).json(newsitems.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});


router.put('/:id', (req, res) => {
  // ensure that the id in the request path and the one in request body match
  if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
    const message = (
      `Request path id (${req.params.id}) and request body id ` +
      `(${req.body.id}) must match`);
    console.error(message);
    return res.status(400).json({ message: message });
  }

  // we only support a subset of fields being updateable.
  // if the user sent over any of the updatableFields, we udpate those values
  // in document
  const toUpdate = {};
  const updateableFields = ['title', 'date', 'source', 'summary'];

  updateableFields.forEach(field => {
    if (field in req.body) {
      toUpdate[field] = req.body[field];
    }
  });

  NewsItem
    // all key/value pairs in toUpdate will be updated -- that's what `$set` does
    .findByIdAndUpdate(req.params.id, { $set: toUpdate })
    .then(newsitem => res.status(204).end())
    .catch(err => res.status(500).json({ message: 'Internal server error' }));
});

router.delete('/:id', (req, res) => {
  NewsItem
    .findByIdAndRemove(req.params.id)
    .then(newsitem => res.status(204).end())
    .catch(err => res.status(500).json({ message: 'Internal server error' }));
});


module.exports = {router};