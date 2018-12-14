
const express     = require("express");
const bodyParser  = require("body-parser");
const mongoose    = require('mongoose');
const dotenv      = require('dotenv');
const cors        = require('cors');
const path        = require('path');
dotenv.load();

const app = express();
const userRoutes = require('./routes/userRoutes');
const problemRoutes = require('./routes/problemRoutes');
const faqQuestionRoutes = require('./routes/faqQuestionRoutes');
const forumRoutes = require('./routes/forumRoutes');
const teacherRoutes = require('./routes/teacherRoutes');

mongoose.connect(
  `mongodb+srv://${process.env.user}:${process.env.password}@cluster0-zs90m.mongodb.net/test?retryWrites=true`, { useNewUrlParser: true}
)
.then(() => {
  console.log("Connected to database!");
})
.catch(() => {
  console.log("Connection failed!");
  process.exit(1);
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PATCH, PUT, DELETE, OPTIONS"
//   );
//   next();
// });

app.use('/api/auth', userRoutes);
app.use('/api/problems', problemRoutes);
app.use('/api/faq', faqQuestionRoutes);
app.use('/api/forum', forumRoutes);
app.use('/api/teachers', teacherRoutes);


module.exports = app;
