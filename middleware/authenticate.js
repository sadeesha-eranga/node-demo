const passport = require('passport');

module.exports = (req, res, next) => {
    return passport.authenticate('jwt', { session: false }, (error, userDtls) => {
        if (userDtls) {
            req._user = userDtls;
            next();
        } else {
            const err = new Error('Unauthorized request');
            err.statusCode = 401;
            next(err);
        }
    })(req, res, next);
}
