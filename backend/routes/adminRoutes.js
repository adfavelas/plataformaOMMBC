const router = require('express').Router();
const multer    = require('multer');
const fileHandler = require('../middleware/fileHandler');
const fs  = require('fs');

const storage = multer.diskStorage({
    destination: (req,file, cb) => {
        console.log(file.mimetype);
        cb(null, './temp/');
    },
    filename: (req,file,cb) => {
        let fileName = file.originalname.split(/[^a-zA-Z0-9\_\.]/).join('_');
        req.fileName = fileName;
        cb(null, fileName)
    }
})

router.post('/upload', multer({storage: storage}).any(),fileHandler,  (req,res) => {
    fs.unlink(`./temp/${req.fileName}`, (err) => {
        if (err ) {
            console.log(err);
            return res.json({message: "Uploaded Succesfully", errorCode: 0});
        }
    });
    return res.json({message: "Uploaded Succesfully", errorCode: 0});
});

module.exports = router;