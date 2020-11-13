const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function registerUser(req, res, next) {
    try {
        const { username, password, firstName, lastName, email } = req.body;
        
        const user = await new User({
            username,
            password: await bcrypt.hash(password, 10),
            firstName,
            lastName,
            email
        }).save();
        
        res.json({
            message: 'Successfully registered!',
            user: { ...user._doc, password: undefined }
        });
    } catch (e) {
        logger.error('Error occurred while registering new user', e);
        next(e);
    }
}

async function authenticateUser(req, res, next) {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) return res.status(401).json({
            statusCode: 401,
            message: 'Invalid username!'
        });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({
            statusCode: 401,
            message: 'Invalid password!'
        });
        
        let token = jwt.sign({
            _id: user._id,
            username: user.username
        }, config.JWT_SECRET, {
            expiresIn: '1d'
        });
        
        user.status = 1;
        await user.save();
        
        res.json({
            message: 'Logged in successfully!',
            accessToken: token
        });
    } catch (e) {
        logger.error('Error occurred while authenticating user', e);
        next(e);
    }
}

async function logoutUser(req, res, next) {
    try {
        const user = req._user;
        user.status = 0;
        user.save();
        res.json({
            message: 'Logged out successfully!'
        });
    } catch (e) {
        logger.error('Error occurred while logging out user', e);
        next(e);
    }
}

async function getUserDetails(req, res, next) {
    try {
        res.json({
            user: {
                ...req._user._doc,
                password: undefined
            }
        });
    } catch (e) {
        logger.error('Error occurred while getting user details', e);
        next(e);
    }
}

module.exports = {
    registerUser,
    authenticateUser,
    logoutUser,
    getUserDetails
};
