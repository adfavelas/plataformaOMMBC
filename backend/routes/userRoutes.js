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

router.get('/verifyEmail/:token', (req,res,next)=> {
    const token = req.params.token;
    userFunctions.verifyEmail(token, res);
});

router.get('/profile/:email', (req,res,next)=> {
    // console.log(req.params);
    const email = req.params.email;
    // console.log(email);
    userFunctions.getProfile(email, res);
});

router.put('/update', (req,res,next)=>{
    console.log(req.body);
    userFunctions.updateStudent(req,res);
});

router.put('/changePassword', (req,res,next)=>{
    userFunctions.changePassword(req,res);
});
// router.get('/user/:email', (req,res,next) => {
//     // console.log('here');
//     userFunctions.getAllUsers(req,res);
// });

module.exports = router;