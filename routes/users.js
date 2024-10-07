const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const userController = require('../controllers/users');
const { storeReturnTo } = require('../middleware')

router.route('/register')
    .get(userController.renderRegisterForm)
    .post(catchAsync(userController.registerLogic));

router.route('/login')
    .get(userController.renderLoginForm)
    .post(storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), userController.loginLogic);

router.get('/logout', userController.logoutLogic); 

module.exports = router;