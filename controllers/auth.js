const jwt = require('jsonwebtoken');
const User = require('../models/User');

const register = async (req, res, next) => {
    const { email, password, name, dob, gender } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Email already exists' });
        }

        const newUser = new User({ email, password, name, gender, dob });
        const savedUser = await newUser.save();
        if (savedUser) {
            res.status(201).json({ success: true, message: 'Registration successful' });
        }
        else {
            res.status(402).json({ success: false, message: "Something went wrong while creating the user" });
        }
    } catch (error) {
        res.status(402).json({ success: false, message: `Error ${error}, occurred` });
    }
};

const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const passwordMatch = await user.comparePassword(password);

        if (!passwordMatch) {
            return res.status(401).json({ success: false, message: 'Incorrect password' });
        }

        const token = jwt.sign({ userId: user._id }, 'secretkey', {
            expiresIn: '24 hour'
        });
        res.json({ success: true, message: token });
    }
    catch (error) {
        next(error)
    }
};

module.exports = { register, login };