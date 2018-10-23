const express           = require('express');
const User              = require('../models/User');
const Student           = require('../models/Student');
const userFunctions     = require('../controllers/user');
const router = express.Router();

router.post('/signup', (req,res,next) => {
    userFunctions.createUser(req,res,next);
});

router.post('/login', (req,res,next) => {
    userFunctions.loginUser(req,res);
});

router.get('/users', (req,res,next) => {
    // console.log('here');
    userFunctions.getAllUsers(req,res);
});

module.exports = router;