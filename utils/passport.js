const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const Users = require("./../userSchema/userSchema")
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'NeshBarfa';
module.exports = function passport(passport) {

    passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
        const userData = await Users.findById(jwt_payload.id)
        if (!userData) {
            return done("", false);
        }
        if (userData) {
            return done(null, userData);
        } else {
            return done(null, false);

        }

    })
    );
}