const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const newUser = new Schema({
    username: String,
    password: String,
    email: String,
    role: { type: String, enum: ['student', 'admin'], default: 'student' },
});

const User = mongoose.model('User', newUser);

const courseSchema = new Schema({
    title: String,
    description: String,
    materials: [{ type: String }],
    modules: [{ type: Schema.Types.ObjectId, ref: 'Module' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    image: String
});

const Course = mongoose.model('Course', courseSchema);

const moduleSchema = new Schema({
    title: { type: String},
    description: String,
    lessons: [{ type: Schema.Types.ObjectId, ref: 'Lesson' }],
    courseId: { type: Schema.Types.ObjectId, ref: 'Course' },
    image: String
});

const Module = mongoose.model('Module', moduleSchema);

const lessonSchema = new Schema({
    title: { type: String},
    content: { type: String },
    quizzes: [{ type: Schema.Types.ObjectId, ref: 'Quiz' }],
    moduleId: { type: Schema.Types.ObjectId, ref: 'Module' },
});

const Lesson = mongoose.model('Lesson', lessonSchema);

const userProgressSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    course: { type: Schema.Types.ObjectId, ref: 'Course' },
    module: { type: Schema.Types.ObjectId, ref: 'Module' },
    lesson: { type: Schema.Types.ObjectId, ref: 'Lesson' },
    quizResults: [{ quizId: Schema.Types.ObjectId, userAnswer: String, isCorrect: Boolean }],
});

const UserProgress = mongoose.model('UserProgress', userProgressSchema);

const commentSchema = new Schema({
    text: { type: String },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    date: { type: Date, default: Date.now },
    rating: Number,
    courseId: { type: Schema.Types.ObjectId, ref: 'Course' },
});

const Comment = mongoose.model('Comment', commentSchema);

const quizSchema = new Schema({
    question: { type: String},
    options: [{ type: String}],
    correctOption: { type: String},
    moduleId: { type: Schema.Types.ObjectId, ref: 'Module' },
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = { User, Course, Module, Lesson, UserProgress, Comment, Quiz };



