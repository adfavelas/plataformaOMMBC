const User = require('../models/User');
const Teacher = require('../models/Teacher');
const bcrypt = require('bcrypt-nodejs');
exports.getPendingTeachers = (req, res, next) => {
    User.find({ $and: [{ role: 'teacher' }, { status: 'pending' }] }, (err, users) => {
        if (err) {
            console.log(err);
            return res.json({ message: 'Ha ocurrido un error, por favor intentalo más tarde.', teachers: null, errorCode: 1 });
        }
        const pendingTeachersEmails = [];
        users.forEach((user) => {
            pendingTeachersEmails.push(user.email);
        });

        Teacher.find({ email: pendingTeachersEmails }, (err, teachers) => {
            if (err) {
                console.log(err);
                return res.json({ message: 'Ha ocurrido un error, por favor intentalo más tarde.', teachers: null, errorCode: 1 });
            }
            return res.json({ message: 'success', teachers: teachers, errorCode: 0 });
        });
    });
}

exports.registerTeacher = (req,res) => {
    bcrypt.hash(req.body.password,bcrypt.genSaltSync(10), null ,(err, hash) => {   
        if (err){  
            console.log(err);
            return res.json({message: "El correo electrónico que estás registrando ya se encuentra en uso.", errorCode:1});
        }
        const user = new User({
          email: req.body.email,
          password: hash,
          status: 'pending',
          role: req.body.role
        });
        
        user.save().then( result => {
            console.log(result);
            const teacher = new Teacher({
                name: req.body.name,
                lastName: req.body.lastName,
                // age: req.body.age,
                schoolName: req.body.schoolName,
                state: req.body.state,
                country: req.body.country,
                birthDate: req.body.birthDate,
                email: req.body.email
            });
            teacher.save().then( response => {
                console.log(response);
                return res.json({message: "Se ha registrado exitosamente ", errorCode: 0})
                // sendVerificationEmail(user, (message)=>{
                //     res.json({message, errorCode: 0});
                // });
            }).catch( err => {
                User.deleteOne({_id: result._id},function() {
                    return res.json({message: "El correo electrónico que estás registrando ya se encuentra en uso.", errorCode: 1});
                });
                if (err) {
                    console.log(err);
                    console.log('catch student');
                }
            });
        }).catch( err => {
            console.log(err.email);
            return res.json({message: "El correo electrónico que estas registrando ya se encuentra en uso.", errorCode: 1});
        })
    });
}