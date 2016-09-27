var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var passport = require('passport');
var LdapStrategy = require('passport-ldapauth');
var config = require('../config');

passport.use(new LdapStrategy(config.ldap));

router.post('/', function(req, res, next) {
    passport.authenticate('ldapauth', {session: false}, function(err, client, info) {
        if (err) {
            return next(err);
        }

        if (!client) {
            return res.json({ success : false, message : 'authentication failed' });
        }

        User.findOne({'name': client.uid}, function(err, user) {
            if (err) {
                return res.json({ success : false, message : 'user account doesnot exist' });
            }

            return res.json({ success : true, uid: user._id, message : 'authentication succeeded' });
        });
    })(req, res, next);
});

module.exports = router;
