const bcrypt        = require('bcrypt-nodejs');
const User          = require('../models/User');
const jwt           = require('jsonwebtoken');
const Student       = require('../models/Student');

exports.createUser = (req,res,next) => {
    bcrypt.hash(req.body.password,bcrypt.genSaltSync(10), null ,(err, hash) => {
        
        if (err){  
            console.log(err);
            return res.json({message: "El correo electrónico que estás registrando ya se encuentra en uso.", errorCode:1});
        }
        const user = new User({
          email: req.body.email,
          password: hash,
          status: 'active',
          role: 'student'
        });
        
        user.save().then( result => {
            console.log(result);
            const student = new Student({
                name: req.body.name,
                lastName: req.body.lastName,
                // age: req.body.age,
                schoolName: req.body.schoolName,
                state: req.body.state,
                city: req.body.city,
                birthDate: req.body.birthDate,
                email: req.body.email,
                password: user.password
            });
            student.save().then( response => {
                console.log(response);
                return res.json({message: "success", errorCode: 0});
            }).catch( err => {
                User.deleteOne({_id: result._id},function() {
                    return res.json({message: "El correo electrónico que estás registrando ya se encuentra en uso.", errorCode: 1});
                });
                if (err) console.log('catch student');
            });
        }).catch( err => {
            console.log(err);
            return res.json({message: "El correo electrónico que estás registrando ya se encuentra en uso.", errorCode: 1});
        })
    });
}

exports.loginUser = (req,res) => {
    let fetchedUser;
    User.findOne({ email: req.body.email })
        .then(user => {
        if (!user) {
            return res.json({
            message: "Usuario y/o contraseña incorrectos."
            });
        } else{
            fetchedUser = user;
            bcrypt.compare(req.body.password,user.password, (err, result) => {
            if(err) console.log(err);
                if (!result) {
                    return res.json({
                    message: "Usuario y/o contraseña incorrectos."
                    });
                }
                const token = jwt.sign(
                    { email: fetchedUser.email, userId: fetchedUser._id },
                    "OMMBC SECRET KEY",
                    { expiresIn: "3h" }
                );
                res.status(200).json({
                    token: token,
                    message: 'success',
                    expiresIn: '3h',
                    userId: fetchedUser._id
                });
            });
        }
    });
}

// exports.getAllUsers = (req,res)=> {
//     let fetchedUser = {}
//     User.findOne({email: req.params.email}, (err, result) => {
//         fetchedUser.user = result;
//         console.log(result.email);
//         // res.send(result);
//         Student.findOne({email: result.email}, (err,student )=> {
//             console.log(student);
//             fetchedUser.student = student;
//             res.send(fetchedUser);
//         })
//     })


// }