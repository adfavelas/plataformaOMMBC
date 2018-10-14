const bcrypt        = require('bcrypt');
const User          = require('../models/User');
const jwt           = require('jsonwebtoken');
const Student       = require('../models/Student');

exports.createUser = (req,res,next) => {
    bcrypt.hash(req.body.password,10).then(hash => {
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
                firstLastName: req.body.firstLastName,
                secondLastName: req.body.secondLastName,
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
                res.json({message: "success", errorCode: 0});
            }).catch( err => {
                User.deleteOne({_id: result._id});
                if (err) console.log(err);
                res.json({message: "failed", errorCode: 1});
            })
        }).catch(err => {
            if( err ) console.log(err);
            res.json({message: "failed", errorCode: 1});
        })
    });
}

exports.loginUser = (req,res) => {
    let fetchedUser;
    User.findOne({ email: req.body.email })
        .then(user => {
        if (!user) {
            return res.status(401).json({
            message: "failed"
            });
        }
        fetchedUser = user;
        return bcrypt.compare(req.body.password, user.password);
        })
        .then(result => {
        if (!result) {
            return res.status(401).json({
            message: "failed"
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
    }).catch(err => {
        return res.status(401).json({
            message: "Invalid authentication credentials!"
        });
    });
}

exports.getAllUsers = (req,res)=> {
    // User.find({}, (err, result) => {
    //     console.log(result);
    //     res.json(result);
    // })
}