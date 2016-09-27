var express = require('express');
var router = express.Router();
var Tweet = require('../models/feed.js');
var config = require('../config');

router.get('/', function(req, res, next) {
  var uid = req.get('uid');

  Tweet.find({user: uid}).limit(config.feedLimit).exec(function (err, tweets) {
    if (err) return next(err);
    res.json(tweets);
  });
});

router.post('/', function(req, res, next) {
  Tweet.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.get('/:id', function(req, res, next) {
  Tweet.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.put('/:id', function(req, res, next) {
  Tweet.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.delete('/:id', function(req, res, next) {
  Tweet.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;