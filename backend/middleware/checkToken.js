const jwt       = require('jsonwebtoken');
const User      = require('../models/User');

module.exports = async(req,res,next) => {
    // console.log(req.authorization);
    const token = req.headers.authorization;
    if (token){
        jwt.verify(token, process.env.JWTSECRET, async(err, decoded)=>{
            if(err){
                console.log(err);
                return res.json({errorCode:3 , message: "Token expired"});
            }
            else {
                try {
                    const user = await User.findOne({email : decoded.email});
                    if (user) {
                        req.user = {
                            email: decoded.email,
                            userId: decoded.userId
                        }
                        next();
                    } else {
                        console.log(err);
                        return res.json({errorCode:3 , message: "usuario no valido"});
                    }   
        
                } catch ( err) {
                    console.log(err);
                    return res.json({errorCode:3 , message: "usuario no valido"});
                }
            }
        });   
    }
    else {
        return res.json({errorCode: 3, message: "No se encontro token"});
    }
}