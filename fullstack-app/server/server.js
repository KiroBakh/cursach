const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const passport = require('passport');

const { connectToMongoDB } = require('./config/database');
connectToMongoDB();


const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes');
const moduleRoutes = require('./routes/moduleRoute');
const lessonRoutes = require('./routes/lessonRoutes');
const userProgressRoutes = require('./routes/userProgressRoutes');
const commentRoutes = require('./routes/commentRoutes');
const quizRoutes = require('./routes/quizeRoute');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
require ('./middleware/passport')(passport);

app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use('/api', userRoutes);
app.use('/api', courseRoutes);
app.use('/api', moduleRoutes);
app.use('/api', lessonRoutes);
app.use('/api', userProgressRoutes);
app.use('/api', commentRoutes);
app.use('/api', quizRoutes);



module.exports = app;
