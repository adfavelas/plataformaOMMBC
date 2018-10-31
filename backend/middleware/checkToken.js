const jwt       = require('jsonwebtoken');
const User      = require('../models/User');

module.exports = (req,res,next) => {
    console.log(req.authorization);
    const token = req.headers.authorization;
    if (token){
        jwt.verify(token, process.env.JWTSECRET, (err, decoded)=>{
            if(err){
                return res.json({erroCode:1 , message: "Token expired"});
            }
            else {
                console.log(decoded);
                User.findOne({email: decoded.email}, (errorUser, user)=> {
                    if(errorUser) {
                        console.log(err);
                        return res.json({erroCode:1 , message: "usuario no valido"})
                    } 
                    else {
                        next()
                    }
                })
            }
        });   
    }
    else {
        res.json({erroCode: 1, message: "No se encontro token"});
    }
}