const User = require('../models/User');
const jwt = require('jsonwebtoken');

module.exports = async (req,res,next) => {
    const token = req.headers.authorization;
    if (token) {
        try {
            const decoded = await jwt.decode(token, process.env.JWTSECRET);
            if (decoded  && decoded.email) {
                const user = await User.findOne({email: decoded.email});
                if (user.role === 'admin') {
                    return next();
                } 
                return res.json({message: "Restricted Access", errorCode: 4});
            }
            return res.json({message: "Restricted Access", errorCode: 4})
        } catch (err) {
            return res.json({message: "Restricted Access", errorCode: 4})
        }
    } else {
        return res.json({errorCode: 3, message: "No se encontro token"}); 
    }
}