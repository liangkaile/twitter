var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.json({ status: 'OK', message: 'Welcome to Employee Feeds', author: 'Kaile Liang' });
});

module.exports = router;
