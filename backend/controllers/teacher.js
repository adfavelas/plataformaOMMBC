const User = require('../models/User');
const Teacher = require('../models/Teacher');

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