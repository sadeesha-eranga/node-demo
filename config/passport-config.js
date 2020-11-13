const passportJWT = require('passport-jwt');
const User = require('../models/User');
const config = require('../config/app-config');

const { ExtractJwt, Strategy } = passportJWT;

function passportConfiguration(passport) {
    const opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = config.JWT_SECRET;
    passport.use(new Strategy(opts, (jwtPayload, done) => {
        User.findOne({ _id: jwtPayload._id, status: 1 })
            .then((user) => done(null, user))
            .catch((err) => done(err, false));
    }));
}

module.exports = passportConfiguration;
