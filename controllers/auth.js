const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const register = async (req,res,next) => {
    const {email,password} = req.body;

    try {
        const hashPassword = await bcrypt.hash(password,10);
        const user = new User({email,password:hashPassword});
        await user.save();
        res.json({message: 'registration successful'})
    } catch(error){
        next(error)
    }
};

const login = async (req,res,next) => {
    const {email,password} = req.body;
    try {
        const user = await User.findOne({email});
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const passwordMatch = await user.comparePassword(password);

        if(!passwordMatch) {
            return res.status(401).json({message: 'Incorrect password'});
        }

        const token = jwt.sign({userId: user._id},'secretkey',{
            expiresIn: '1 hour'
        });
        res.json({token});
    }
    catch (error) {
        next(error)
    }
};

module.exports = { register, login };