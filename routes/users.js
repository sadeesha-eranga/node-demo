const router = require('express').Router();
const { validate } = require('express-validation');
const passport = require('passport');
const validationSchemas = require('../config/validation-schemas');
const userController = require('../controllers/user-controller');
const authenticate = require('../middleware/authenticate');
require('../config/passport-config')(passport);

router.route('/register').post(validate(validationSchemas.registerUser), userController.registerUser);

router.route('/login').post(validate(validationSchemas.authenticateUser), userController.authenticateUser);

router.route('/logout').post(authenticate, userController.logoutUser);

router.route('/profile').get(authenticate, userController.getUserDetails);

module.exports = router;
