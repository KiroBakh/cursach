const { body, param, validationResult } = require('express-validator');
const { User } = require('../models/models');
const { ObjectId } = require('mongoose').Types;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/jwt');

class UserController {
    async createUser(req, res) {
        try {
            const userEmail = await User.findOne({ email: req.body.email });
            const userName = await User.findOne({ username: req.body.username });

            if (userEmail) {
                return res.status(400).json({ error: 'Така пошта вже зареєстрована' });
            }

            if (userName) {
                return res.status(400).json({ error: 'Таке ім\'я вже зареєстровано' });
            }

            const salt = bcrypt.genSaltSync(10);
            const { username, password, email, role } = req.body;

            const newUser = new User({
                username: username,
                password: bcrypt.hashSync(password, salt),
                email: email,
                role: role
            });

            await newUser.save();

            console.log("Користувач успішно створений");
            res.status(201).json(newUser);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Помилка створення користувача' });
        }
    }



    async getAllUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: 'Помилка отримання користувачі' });
        }
    }

    async getUserById(req, res) {
        try {
            const userId = req.params.id;
            if (!ObjectId.isValid(userId)) {
                return res.status(400).json({ error: 'Некоректний ObjectId' });
            }

            const user = await User.findById(userId);
            console.log(user);

            if (!user) {
                return res.status(404).json({ error: 'Користувача не знайдено' });
            }

            res.json(user);
        } catch (error) {
            res.status(500).json({ error: 'Помилка отримання користувача' });
        }
    }

    async loginUser(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email: email });

            if (user) {
                const isMatch = bcrypt.compareSync(password, user.password);
                if (isMatch) {
                    const token = jwt.sign({ email: user.email, id: user._id },
                        keys.jwt, { expiresIn: 3600 });

                    res.status(200).json({
                        token: `Bearer ${token}`,
                        user: {
                            id: user._id,  
                            username: user.username,
                            email: user.email,
                            role: user.role,
                        },
                    });
                } else {
                    res.status(401).json({
                        message: 'Incorrect password',
                    });
                }
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Login error' });
        }
    }

    async updateUser(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const userId = req.params.id;
            const updatedUserData = req.body;

            const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, { new: true });

            if (!updatedUser) {
                return res.status(404).json({ error: 'Користувач не знайдено' });
            }

            res.json(updatedUser);
        } catch (error) {
            res.status(500).json({ error: 'Помилка редагування користувача' });
        }
    }

    async deleteUser(req, res) {
        try {
            const userId = req.params.id;
            const user = await User.findById(userId);

            if (!user) {
                return res.status(404).json({ error: 'Користувач не знайдено' });
            }

            await User.findByIdAndDelete(userId);

            res.json({ message: 'Користувач видалено успішно' });
        } catch (error) {
            res.status(500).json({ error: 'Помилка видалення користувача' });
        }
    }
}

module.exports = new UserController();

