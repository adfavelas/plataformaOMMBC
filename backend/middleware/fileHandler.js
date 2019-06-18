
const Converter = require('csvtojson');
const Problem   = require('../models/Problem');

module.exports = (req,res,next) => {
    Converter().fromFile(`./temp/${req.fileName}`).then(async file => {
        console.log(typeof(res));
        try {
            await Problem.collection.insertMany(file);
            next();
        } catch (err) {
            console.log(err);
            return res.json({errorCode:1 , message: "Something went wrong, please try again later"})
        }
        // Problem.collection.insert(res, (err, docs) => {
        //     if (err) {
        //         console.log(err)
        //     } else {
        //         console.log('succees');
        //         fs.unlinkSync(req.fileName);
        //     }
        // })

    })
}