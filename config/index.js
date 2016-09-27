var env = process.env.NODE_ENV || 'development';
var config = require('./' + env + '.json');

module.exports = config;