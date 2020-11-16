const passport = require('passport');
const { StatusCodes } = require('http-status-codes');

module.exports = (req, res, next) => {
    return passport.authenticate('jwt', { session: false }, (error, userDtls) => {
        if (userDtls) {
            req._user = userDtls;
            next();
        } else {
            const err = new Error('Unauthorized request');
            err.code = StatusCodes.UNAUTHORIZED;
            next(err);
        }
    })(req, res, next);
}
