const bcrypt        = require('bcrypt-nodejs');
const User          = require('../models/User');
const jwt           = require('jsonwebtoken');
const Student       = require('../models/Student');
const mailer        = require("nodemailer");


sendVerificationEmail = (user, cb) => {  
    let url = 'http://localhost:8080/api/auth/verifyEmail/';
    const token = jwt.sign(
        { email: user.email },
        process.env.JWTSECRET
    );
    let transporter =  mailer.createTransport({
        service: "Gmail", // true for 465, false for other ports
        auth: {
            user: process.env.OMMBCUSER, // generated ethereal user
            pass: process.env.OMMBCPASSWORD  // generated ethereal password
        },
    })

    let mailOptions = {
        from: 'Ommbc', // sender address
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
            let message = "Tu registro se ha completado con éxito. Por favor revisa la bandeja de entrada del correo electrónico con el que te registraste para confirmar tu cuenta en nuestra plataforma\nOJO: No podrás acceder a la plataforma hasta que tu correo sea confirmado.";
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
          role: req.body.role
        });
        
        user.save().then( result => {
            const student = new Student({
                name: req.body.name,
                lastName: req.body.lastName,
                // age: req.body.age,
                schoolName: req.body.schoolName,
                state: req.body.state,
                country: req.body.country,
                birthDate: req.body.birthDate,
                email: req.body.email,
                totalScore: 0
            });
            student.save().then( response => {
                sendVerificationEmail(user, (message)=>{
                    res.json({message, errorCode: 0});
                });
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
            return res.json({message: "No se ha verificado su correo porfavor revise su bandeja de correo."});
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
    jwt.verify(token,process.env.JWTSECRET, async(err, decoded) => {
        // console.log(decoded);
        try {
            const user = await User.findOne({email: decoded.email});
            if (user.status === 'pending'){
                user.status = 'active';
                await User.update({email: decoded.email}, user);
                res.redirect('http://localhost:4200/login');
            }
        } catch(err) {
            return res.redirect('http://localhost:4200/error');
        }
    });
}


exports.getProfile = (email,res) => {
    Student.findOne({email: email}, (err, student)=> {
        if(err) { 
            console.log(err); 
            return res.json({errorCode:1, message:"Usuario no encontrado."});
        }
        return res.json({message: "success", student: student});
    });
}


exports.updateStudent = async(req,res) => {
    // console.log(req.body.email)
    try {
        const fetchedStudent = await Student.findOne({email: req.user.email});
        const student = new Student({
            _id: fetchedStudent._id,
            name: req.body.name,
            lastName: req.body.lastName,
            // age: req.body.age,
            schoolName: req.body.schoolName,
            state: req.body.state,
            country: req.body.country,
            birthDate: req.body.birthDate,
            email: req.user.email,
            solvedProblems: fetchedStudent.solvedProblems,
            totalScore: fetchedStudent.totalScore
        });
        await Student.updateOne({email: req.user.email}, student);
        return res.json({message: "Sus datos han sido actualizados.", errorCode: 0});
    } catch(err) {
        console.log(err);
        return res.json({message: "Ha ocurrido un error intente mas tarde.", errorCode: 1});
    }
}

exports.changePassword = (req,res)=> {
    let email = req.body.email;
    if ( !email ) {
        email = req.user.email;
    }
    const newPassword = req.body.password;
    User.findOne({email: email}, (err, result)=> {
        if(err){
            res.json({message: "No se ha podido encontrar al usuario.", errorCode: 1});
        }
        else {
            let user = result;
            bcrypt.hash(newPassword, bcrypt.genSaltSync(10), null , (errHash, hash)=> {
                if(errHash) {
                    return res.json({message: "Ha ocurrido un error, por favor intente mas tarde.", errorCode:1});
                } else {
                    bcrypt.compare(req.body.password,user.password, (err, equal) => {
                        if(err) {
                            console.log(err);
                        } else if (equal) {
                            return res.json({ message: "La contraseña seleccionada es igual a la contraseña actual. Por favor, selecciona una nueva.", errorCode: 2 })
                        } else {
                            user.password = hash;
                            User.updateOne({email: user.email}, user, (err, response)=>{
                                if(err){
                                    return res.json({message: "Ha ocurrido un error, intente mas tarde.", errorCode: 1});
                                }
                                else {
                                    return res.json({message: "Usuario actualizado correctamente.", errorCode: 0});
                                }
                            });
                        }
                    });
                }
            });
        }

    })
}


exports.sendRestoreEmail = (req,res) => {
    console.log(req.params.email);
    let url = 'http://localhost:8080/api/auth/restorePassword/';
    const token = jwt.sign(
        { email: req.params.email },
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
        from: 'Ommbc', // sender address
        to: `${req.params.email}`, // list of receivers
        subject: 'OMMBC | Verifica Tu Correo', // Subject line
        text: 'Restaurar Contraseña', // plain text body
        html: `<html>
                    <style>
                        h1, p { color: black; }
                    </style>
                    <body>
                        <h1>Ommbc</h1>
                        <p>Para restaurar tu contraseña presiona click en el link de abajo</p>
                        <a href="${url}${token}">Restaurar Contraseña</a>
                    </body>
                </html>`
        // html body
    };
    User.findOne({email : req.params.email}, (err , user)=> {
        if(err){
            return res.json({message: "No se ha encontrado usuario.", errorCode: 1});
        } else {
            if(user && user !== null) {
                transporter.sendMail(mailOptions, (error, info) => {
                    console.log("SENDING");
                    if (error) {
                        console.log(error);
                        return res.json({ error, message: "Ha ocurrido un error, por favor intente mas tarde.", errorCode: 1});
                        // return message;
                    } else {
                        console.log('Message sent: %s'+ info.messageId);   
                        return res.json({message: "Correo de Restauración de Contraseña Enviado.", errorCode:0});
            
                    }
    
                });
            }
            else {
                return res.json({message: "No se ha encontrado usuario.", errorCode: 1});
            }
        }
    })
}

exports.restorePasswordAccess = (req,res) => {
    let token = req.params.token;
    jwt.verify(token, process.env.JWTSECRET, (err, decoded)=> {
        if(err){
            return res.json({message: "Ha ocurrido un error.", errorCode: 1});
        }
        else {
            const email = req.body.email;
            User.findOne({email: email}, (err, user)=> {
                if ( err ){
                    return res.json({message: "Ha ocurrido un error.", errorCode: 1});
                } else {
                    return res.redirect('http://localhost:4200/restorePassword/'+ token);
                }
            })
        }
        
    });
}

exports.getAllStudents = (req,res)=> {
    let query = Student.find({}).sort({'totalScore': 'descending'});
    query.exec((err, fetchedStudents) => {
        if( err ) {
            console.log(err);
            return res.json({message: "No se ha encontrado ningún usuario.", errorCode: 1 });
        } else {
            return res.json({message: "Success", students: fetchedStudents, errorCode: 0});
        }
    });
}

exports.getStudentProfile = (req,res) => {
    Student.findById(req.params.id, (err , student)=>{
        if(err) {
            return res.json({errorCode:1, message: "No se ha encontrado usuario"});
        } else {
            return res.json({errorCode: 0, message: "Usuario encontrado exitosamente", student});
        }
    });
}