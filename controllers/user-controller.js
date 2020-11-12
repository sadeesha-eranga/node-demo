const User = require('../models/User');

async function registerUser(req, res, next) {
    try {
        res.json({
            users: await User.find()
        });
    } catch (e) {
        console.error(e);
        next(e);
    }
}

module.exports = {
    registerUser
};
