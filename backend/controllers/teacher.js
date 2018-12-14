const User = require('../models/User');
const Teacher = require('../models/Teacher');

exports.getPendingTeachers = (req, res, next) => {
    User.find({ $and: [{ role: 'teacher' }, { status: 'pending' }] }, (err, users) => {
        if (err) {
            console.log(err);
            return res.json({ message: 'Ha ocurrido un error, por favor intentalo más tarde.', teachers: null, errorCode: 1 });
        }
        user.forEach((user) => {
            const pendingTeachers = [];
            Teacher.findOne({ email: user.email }, (err, teacher) => {
                if (err) {
                    console.log(err);
                    return res.json({ message: 'Ha ocurrido un error, por favor intentalo más tarde.', teachers: null, errorCode: 1 });
                }
                pendingTeachers.push(teacher);
            });
            return res.json({ message: 'success', teachers: pendingTeachers, errorCode: 0 });
        });
    });
}