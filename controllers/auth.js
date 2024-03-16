const jwt = require('jsonwebtoken');
const User = require('../models/User');

const register = async (req, res, next) => {
    const { email, password } = req.body;

    try {
<<<<<<< HEAD
        const user = new User({ email, password});
=======
        const user = new User({ email, password });
>>>>>>> b04f1b58294f2040fb49920ae91d33f3c920ad28
        await user.save();
        res.json({ message: 'registration successful' })
    } catch (error) {
        next(error)
    }
};

const login = async (req, res, next) => {
    const { email, password } = req.body;
<<<<<<< HEAD

=======
>>>>>>> b04f1b58294f2040fb49920ae91d33f3c920ad28
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const passwordMatch = await user.comparePassword(password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        const token = jwt.sign({ userId: user._id }, 'secretkey', {
            expiresIn: '1 hour'
        });
        res.json({ token });
<<<<<<< HEAD
    } catch (error) {
=======
    }
    catch (error) {
>>>>>>> b04f1b58294f2040fb49920ae91d33f3c920ad28
        next(error)
    }
};

module.exports = { register, login };