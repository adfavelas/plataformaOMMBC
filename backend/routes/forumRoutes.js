const express = require('express');
const checkToken = require('../middleware/checkToken.js');
const forumFunctions = require('../controllers/forumFunctions');
const ForumQuestion = require('../models/ForumQuestion');
const router = express.Router();


router.get('', checkToken , (req,res,next)=> {
    forumFunctions.getForumQuestions(req,res);
});


router.get('/createForumQuestion', checkToken, (req,res,next)=>{
    forumFunctions.createForumQuestion(req,res);
});

// router.get('/create' , (req,res,next)=> {
//     const now = Date.now();
//     const forum = new ForumQuestion({
//         title: 'Titulo Fake',
//         question: 'Que le pasa a Lupita',
//         date: now,
//         questionerId: '5be3bcf884bc5635fe09bc99',
//         replies: [
//             {
//                 reply: 'Nose',
//                 date: now,
//                 replierName: 'Diego',
//                 replierId: '5be99020fc5327d9d9e3508e'
//             },
//             {
//                 reply: 'Que es lo que quiere Bailar',
//                 date: now,
//                 replierName: 'Alumno',
//                 replierId: '5beb6c9e9daefc54530b7668'
//             },
//         ]
//     });

//     forum.save().then( result => {
//         console.log(result);
//         return res.send({result, errorCode: 0});
//     }).catch(err => {
//         console.log(err);
//         return res.json({errorCode: 1, message: 'Fallo'});
//     })
// })
module.exports = router;