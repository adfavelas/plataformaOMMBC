const bcrypt        = require('bcrypt-nodejs');
const User          = require('../models/User');
const jwt           = require('jsonwebtoken');
const Student       = require('../models/Student');
const mailer        = require("nodemailer");


sendVerificationEmail = (user, cb) => {  
    let url = 'http://localhost:8080/api/auth/verifyEmail/';
    const token = jwt.sign(
        { email: user.email },
        process.env.JWTSECRET,
        { expiresIn: "2h" }
    );
    let transporter =  mailer.createTransport({
        service: "Gmail", // true for 465, false for other ports
        auth: {
            user: process.env.OMMBCUSER, // generated ethereal user
            pass: process.env.OMMBCPASSWORD  // generated ethereal password
        },
    })

    let mailOptions = {
        from: '', // sender address
        to: `${user.email}`, // list of receivers
        subject: 'OMMBC | Verifica Tu Correo', // Subject line
        text: 'Verificación de correo electrónico', // plain text body
        html: `<html>
                    <style>
                        h1, p { color: black; }
                    </style>
                    <body>
                        <h1>¡Gracias por registrarte a la plataforma de entrenamiento digital de la OMMBC!</h1>
                        <p>Para acceder al contenido de la plataforma visita el enlace que se encuentra debajo:</p>
                        <a href="${url}${token}">Verificar Correo</a>
                    </body>
                </html>`
        // html body
    };
    transporter.sendMail(mailOptions, (error, info) => {
        console.log("SENDING");
        if (error) {
            console.log(error);
            // res.send({error, message: "Error Interno porfavor intente mas tarde"});
            // res.json({ error, message: "Ha Ocurrido Un Error Porfavor Intente Mas Tarde", errorCode: 1});
            let message = "Ha Ocurrido Un Error Porfavor Intente Mas Tarde";
            cb(message);
            // return message;
        } else {
            console.log('Message sent: %s'+ info.messageId);   
            // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            // res.status(200).json({"msg": "mesage  has been sent"});
            //res.json({message: "Mensaje Enviado" , errorCode:0});
            let message = "Success";
            cb(message);
            // return message;
        }
        // console.log('INFOO: ' + info);
        
    });
};

exports.createUser = (req,res,next) => {
    bcrypt.hash(req.body.password,bcrypt.genSaltSync(10), null ,(err, hash) => {
        
        if (err){  
            console.log(err);
            return res.json({message: "El correo electrónico que estás registrando ya se encuentra en uso.", errorCode:1});
        }
        const user = new User({
          email: req.body.email,
          password: hash,
          status: 'pending',
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
                email: req.body.email
            });
            student.save().then( response => {
                console.log(response);
                sendVerificationEmail(user, (message)=>{
                    res.json({message});
                });
                // return res.json({successResponse});
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
        } 
        else if (user.status !== "active"){
            return res.json({message: "No se ha verificado su correo porfavor revise su bandeja de correo"});
        }
        else{
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
                    process.env.JWTSECRET,
                    { expiresIn: "3h" }
                );
                res.status(200).json({
                    token: token,
                    message: 'success',
                    userId: fetchedUser._id
                });
            });
        }
    });
}

exports.verifyEmail = (token, res) => {
    const date = new Date();
    jwt.verify(token,process.env.JWTSECRET, (err, decoded) => {
        console.log(decoded);
        User.findOne({email: decoded.email},(err, user)=>{
            if(err) {
                console.log(err);
                res.redirect('http://localhost:4200/error');
            }
            else {
                if(user.status === 'pending') {
                    user.status = 'active';
                    User.updateOne({email: decoded.email }, user).then(result => {
                        res.redirect('http://localhost:4200/login');
                    }).catch(err => {
                        if(err) {
                            console.log(err);
                            res.redirect('http://localhost:4200/error');
                        }
                    })
                }
            }
        })    
    });
}


exports.getProfile = (email,res) => {
    let profile = {};
    User.findOne({email: email}, (err,user) => {
        if(err){ 
            console.log(err); 
            return res.json({errorCode:1, message:"Usuario no encontrado"});
        }
        profile.email = user.email;
        Student.findOne({email: email}, (err, student)=> {
            if(err) { 
                console.log(err); 
                return res.json({errorCode:1, message:"Usuario no encontrado"});
            }
            profile.student = student;
            return res.json({message: "success", profile: profile});
        })
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