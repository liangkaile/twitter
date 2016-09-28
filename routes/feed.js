var express = require('express');
var router = express.Router();
var Tweet = require('../models/feed.js');
var User = require('../models/user.js');
var config = require('../config');
var BbPromise = require('bluebird');
var _ = require('lodash-node');
var FEED_NUM_LIMIT = config.feedNumLimit || 100;;
var FEED_DAY_LIMIT = config.feedTimeLimit || 7;

function getTweetsForUser(userId, numLimit, dayLimit) {
  var cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - dayLimit);

  return new BbPromise(function (resolve, reject) {
    Tweet.find({user: userId, updated_at: {$gte: cutoff}}).limit(FEED_NUM_LIMIT).lean().exec(function (err, tweets) {
      if (err) { 
        reject(err);
      } else {
        resolve(tweets);
      }
    });
  });
}

function getUserByUserId(userId) {
  return new BbPromise(function (resolve, reject) {
    User.findById(userId, function (err, user) {
      if (err) {
        reject(err);
      } else {
        resolve(user && user.toObject());
      }
    });
  });
}

router.get('/mine', function(req, res, next) {
  var uid = req.get('uid');

  getTweetsForUser(uid, FEED_NUM_LIMIT, FEED_DAY_LIMIT).then(function fullfilled(feeds){
     res.json(feeds);
  },
  function rejected(error){
      return next(error);
  });
});

router.get('/', function (req, res, next) {
  var uid = req.get('uid');

  getUserByUserId(uid).then(
    function fullfiled(user){
      var tweetPromise = [];
      for (var i = 0; i < user.followIds.length; i++) {
        tweetPromise.push(getTweetsForUser(user.followIds[i], FEED_NUM_LIMIT, FEED_DAY_LIMIT));
      }
      BbPromise.all(tweetPromise).then(
        function (tweetLists) {
          if (tweetLists) {
            var feeds = [].concat.apply([], tweetLists);
            feeds = _.sortBy(feeds, function (feed) { return -(new Date(feed.updated_at)); }).splice(0, 100);
            res.json(feeds);
          }
        },
        function (error) {
          return next(error);
        }
      )
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