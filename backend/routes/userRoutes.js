const express           = require('express');
const User              = require('../models/User');
const Student           = require('../models/Student');
const userFunctions     = require('../controllers/user');
const checkToken        = require('../middleware/checkToken');
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

router.get('/profile', checkToken ,(req,res,next)=> {
    console.log(req.user);
    // console.log(req.params);
    const email = req.user.email;
    // console.log(email);
    userFunctions.getProfile(email, res);
});

router.put('/update', checkToken,(req,res,next)=>{
    console.log(req.body);
    userFunctions.updateStudent(req,res);
});

router.put('/changePassword', checkToken,(req,res,next)=>{
    userFunctions.changePassword(req,res);
});

router.get('/sendRestoreEmail/:email', (req,res,next)=>{
    console.log(req.params);
    // res.json({message: "Here"});
    userFunctions.sendRestoreEmail(req,res);
});

router.get('/restorePassword/:token', (req,res,next)=>{
    userFunctions.restorePasswordAccess(req,res);
    // let token = req.params.token;
    // res.redirect('http://localhost:4200/restorePassword/'+ token);
});

router.put('/changePasswordFromRestore',(req,res,next) => {
    userFunctions.changePassword(req,res);
});


router.get('/getStudents', (req,res,next)=> {
    userFunctions.getAllStudents(req,res);
});

router.get('/student/:id', (req,res,next)=>{
    userFunctions.getStudentProfile(req,res);
});

module.exports = router;