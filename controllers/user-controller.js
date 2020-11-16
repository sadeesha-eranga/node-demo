const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');

async function registerUser(req, res, next) {
    try {
        const { username, password, firstName, lastName, email } = req.body;
        
        const existsByUserName = await User.countDocuments({username});
        if (existsByUserName) return res.status(StatusCodes.CONFLICT).json({
            code: StatusCodes.CONFLICT,
            message: 'Username already in use!'
        });
        const existByEmail = await User.countDocuments({email});
        if (existByEmail) return res.status(StatusCodes.CONFLICT).json({
            code: StatusCodes.CONFLICT,
            message: 'Email already in use!'
        });
        
        const user = await new User({
            username,
            password: await bcrypt.hash(password, 10),
            firstName,
            lastName,
            email
        }).save();
        
        res.json({
            code: StatusCodes.CREATED,
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
        if (!user) return res.status(StatusCodes.UNAUTHORIZED).json({
            code: StatusCodes.UNAUTHORIZED,
            message: 'Invalid username!'
        });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(StatusCodes.UNAUTHORIZED).json({
            code: StatusCodes.UNAUTHORIZED,
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
            code: StatusCodes.OK,
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
            code: StatusCodes.OK,
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
            code: StatusCodes.OK,
            message: 'User details found!',
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
